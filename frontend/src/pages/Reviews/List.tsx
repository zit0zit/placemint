import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../../comps/Button'
import { Input } from '../../comps/Input'
import useStores from '../../stores'
import './style.scss'

const locations = ['Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Others']

function ListFC() {
  const { appStore } = useStores()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  const [params, setParams] = useSearchParams()

  useEffect(() => {
    const s = params.get('search')
    if (s) {
      setSearch(s)
    } else {
      setSearch('')
    }
  }, [])

  const onSearch = (e: any) => {
    e?.preventDefault?.()
    if (search) {
      setParams({ search })
    } else {
      setParams({})
    }
    setFilter(search)
  }

  return (
    <div className="list">
      <br />
      <br />
      <form className="search" onSubmit={onSearch}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<FontAwesomeIcon icon={faSearch} />}
          placeholder="Enter company name..."
        />
        <Button>Search</Button>
      </form>
      {filter && (
        <div className="noti">
          <span className="red">
            {
              appStore.companies.filter((c) =>
                filter ? new RegExp(filter, 'gi').test(c.name) : true
              ).length
            }
          </span>{' '}
          companies found
        </div>
      )}
      <br />
      <div className="comps">
        {appStore.companies
          .filter((c) =>
            filter ? new RegExp(filter, 'gi').test(c.name) : true
          )
          .map((c, i) => (
            <Link to={'?comp=' + c.id} key={i}>
              <div className="comp">
                <div className="ch">
                  <div className="clg">
                    <img src={c.logo} />
                  </div>
                  <div className="cr">
                    <div className="crs">
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <span>{((c.rate as number) ?? 5)?.toPrecision(2)}</span>
                  </div>
                </div>
                <div className="cn">{c.name}</div>
                <div className="cl">{locations[c.location ?? 3]}</div>
              </div>
            </Link>
          ))}
      </div>
      <br />
      <br />
    </div>
  )
}

export const List = observer(ListFC)
