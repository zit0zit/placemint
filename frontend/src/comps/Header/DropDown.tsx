import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './dropdown.scss'

export interface SubItem {
  index?: string
  name: string
  subItems: Record<string, string>
  onClick?: Function
}

interface Props {
  items: SubItem[]
  children: JSX.Element
  className?: string
}

function chunk<T>(arr: T[], size = 8) {
  const arrcp = [...arr]

  const chunks = []
  while (arrcp.length > 0) {
    chunks.push(arrcp.splice(0, size))
  }

  return chunks
}

export function DropDown({ items, children, className }: Props) {
  const [selected, setSelected] = useState(-1)
  const refContent = useRef<HTMLDivElement>(null)
  const refSubMenu = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    refSubMenu.current = refSubMenu.current.slice(0, items.length)
    updateHeight(selected > 0 ? selected : 0)
  }, [items])

  useEffect(() => {
    document.addEventListener('click', (_e) => {
      if (refContent.current) {
        setSelected(-1)
        refContent.current.style.display = 'none'
        setTimeout(() => {
          if (refContent.current) {
            refContent.current.style.display = ''
          }
        })
      }
    })
  }, [refContent.current])

  const updateHeight = (i: number) => {
    const ct = refContent.current
    const sub = refSubMenu.current[i]
    const select = refSubMenu.current[selected]
    if (ct && sub && select) {
      setTimeout(() => {
        ct.style.height = 'unset'
        sub.style.height = 'unset'

        const max = Math.max(
          ct.clientHeight,
          sub.clientHeight,
          select.clientHeight
        )

        if (max > 0) {
          ct.style.height = max + 'px'
          sub.style.height = max + 'px'
        }
      })
    }
  }

  return (
    <div className={'dropdown ' + (className ?? '')}>
      {children}
      <div className="dropdown-content" ref={refContent}>
        <ul>
          {items.map((it, i) => (
            <li
              key={i}
              className={i == selected ? 'active' : ''}
              onMouseOver={() => {
                setSelected(i)
                updateHeight(i)
              }}
            >
              <div onClick={it.onClick ? () => it.onClick?.() : undefined}>
                {it.index ? (
                  <Link to={it.index}>
                    {it.name}
                    <i className="arrow" />
                  </Link>
                ) : (
                  <span>
                    {it.name}
                    <i className="arrow" />
                  </span>
                )}
              </div>
              {Object.values(it.subItems).length > 0 && (
                <div
                  className="sub-menu"
                  ref={(el) => (refSubMenu.current[i] = el)}
                >
                  <div className="sub-list">
                    {chunk(Object.keys(it.subItems)).map((ck, i) => (
                      <div key={i}>
                        {ck.map((k, i) => (
                          <Link to={k} key={i}>
                            {it.subItems[k]}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  {it.index && Object.values(it.subItems).length > 0 && (
                    <span
                      style={{
                        float: 'right',
                        textDecoration: 'underline',
                        paddingTop: '.5em',
                      }}
                    >
                      <Link to={it.index}>View all {it.name}</Link>
                    </span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
