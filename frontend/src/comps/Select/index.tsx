import React, { useEffect, useRef, useState } from 'react'
import { elmContains } from '../../utils'
import './style.scss'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: JSX.Element
  optionIcon?: JSX.Element
}

export function Select({
  icon,
  optionIcon,
  children,
  className,
  onChange,
  value,
  multiple,
}: Props) {
  const ref = useRef<HTMLSelectElement>(null)
  const refDiv = useRef<HTMLDivElement>(null)

  const [realVal, setRealVal] = useState('')
  const [opts, setOpts] = useState<Record<string, string>[]>([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const opt = [...ref.current.children].map((o: any) => ({
        key: o.value,
        val: o.innerText,
        disabled: o.disabled,
      }))
      setOpts(opt)
      setRealVal(opt[ref.current.selectedIndex].val)
      ref.current.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }, [ref.current?.selectedIndex])

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (refDiv.current) {
        if (!elmContains(refDiv.current, e.target as Element)) {
          setShow(false)
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        setShow(false)
      }
    })
  }, [])

  return (
    <div
      className={'select ' + (show ? 'show ' : '') + (className ?? '')}
      onClick={() => setShow(!show)}
      ref={refDiv}
    >
      {icon && <div className="icon">{icon}</div>}
      <div className="fake">
        <div className="value">{realVal}</div>
        <div className="options">
          {opts.map((o, i) => (
            <div
              className={'option' + (o.key == value ? ' selected' : '')}
              key={i}
              onClick={() => {
                if (ref.current) {
                  ref.current.selectedIndex = i
                }
              }}
            >
              {optionIcon && !o.disabled && (
                <span className="icon">{optionIcon}</span>
              )}{' '}
              {o.val}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden">
        <select
          ref={ref}
          onChange={onChange}
          defaultValue={value}
          multiple={multiple}
        >
          {children}
        </select>
      </div>
    </div>
  )
}
