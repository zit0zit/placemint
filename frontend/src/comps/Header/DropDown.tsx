import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './dropdown.scss'

export interface SubItem {
  index?: string
  name: string
  subItems: Record<string, string>
}

interface Props {
  items: SubItem[]
  children: JSX.Element
}

function chunk<T>(arr: T[], size = 8) {
  const arrcp = [...arr]

  const chunks = []
  while (arrcp.length > 0) {
    chunks.push(arrcp.splice(0, size))
  }

  console.log(chunks)

  return chunks
}

export function DropDown({ items, children }: Props) {
  const [selected, setSelected] = useState(-1)
  const refContent = useRef<HTMLDivElement>(null)
  const refSubMenu = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    refSubMenu.current = refSubMenu.current.slice(0, items.length)
    updateHeight(0)
  }, [items])

  const updateHeight = (i: number) => {
    const ct = refContent.current
    const sub = refSubMenu.current[i]
    if (ct && sub) {
      setTimeout(() => {
        ct.style.height = 'unset'
        sub.style.height = 'unset'
        if (ct.clientHeight <= sub.clientHeight && sub.clientHeight > 0) {
          ct.style.height = sub.clientHeight + 'px'
        } else {
          sub.style.height = ct.clientHeight + 'px'
        }
      })
    }
  }

  return (
    <div className="dropdown">
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
              <div>
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
                {it.index && (
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
