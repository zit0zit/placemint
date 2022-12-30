import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchForm } from '../../comps/SearchForm'
import useStores from '../../stores'
import { getRandomSubarray } from '../../utils'
import './home.scss'

function HomeFC() {
  const { appStore } = useStores()

  const navigate = useNavigate()

  const [topSkill, setTopSkill] = useState<Record<string, string>>({})
  const [topCompanies, setTopCompanies] = useState<Record<string, any>>({})

  useEffect(() => {
    setTopSkill(
      getRandomSubarray(appStore.skills, 8).reduce((acc: any, sk: any) => {
        const id = `/jobs?skill=${sk.id}`
        acc[id] = sk.name
        return acc
      }, {})
    )

    appStore.getTopCompanies().then((res) => {
      const topComps = res.reduce((acc: any, comp: any) => {
        const id = `/reviews?comp=${comp.id}`
        acc[id] = comp
        return acc
      }, {})
      setTopCompanies(topComps)
    })
  }, [appStore.skills, appStore.companies])

  const onSubmit = (keyword?: string, city?: string) => {
    let url = new URL(document.location.origin + '/jobs')
    if (keyword) {
      url.searchParams.set('search', keyword)
    }
    if (city) {
      url.searchParams.set('location', city)
    }

    navigate(url.href.replace(url.origin, ''))
  }

  return (
    <div className="home">
      <div className="search">
        <div className="search-form-wapper">
          <h1 className="slogan">1,058 IT Jobs For "Chất" Developers</h1>
          <SearchForm onSubmit={onSubmit} />
          <div className="top-skills">
            {Object.keys(topSkill).map((sk, i) => (
              <Link to={sk} key={i}>
                {topSkill[sk]}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="top-companies">
        <div className="title">Top Employers</div>
        <div className="list-companies">
          {Object.keys(topCompanies).map((cp, i) => (
            <Link to={cp} key={i}>
              <div className="comp">
                <div className="img">
                  <img src={topCompanies[cp].logo} />
                </div>
                <div className="name">{topCompanies[cp].name}</div>
                <div className="jobs">
                  <span>{topCompanies[cp].num} Jobs</span> -{' '}
                  {topCompanies[cp].city}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Home = observer(HomeFC)
