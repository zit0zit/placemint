import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import useStores from '../../stores'
import { getRandomSubarray } from '../../utils'
import { SearchForm } from '../SearchForm'
import { DropDown, SubItem } from './DropDown'

import './header.scss'

function HeaderFC() {
  const { appStore, userStore } = useStores()

  useEffect(() => {
    userStore.loadUser()
  }, [])

  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const [userItems, setUserItems] = useState<SubItem[]>([])

  useEffect(() => {
    let href = document.location.href.replace(document.location.origin, '')
    setShowSearch(href.startsWith('/jobs'))
  }, [document.location.href])

  const [skills, setSkills] = useState({})
  const [companies, setCompanies] = useState({})

  useEffect(() => {
    setSkills(
      appStore.skills.slice(0, 32).reduce((acc, sk) => {
        const id = `/jobs?skill=${sk.id}`
        acc[id] = sk.name
        return acc
      }, {} as Record<string, string>)
    )

    setCompanies(
      getRandomSubarray(appStore.companies, 24).reduce((acc, cp) => {
        const id = `/jobs?company=${cp.id}`
        acc[id] = cp.name
        return acc
      }, {} as Record<string, string>)
    )
  }, [appStore.skills, appStore.companies])

  const items: SubItem[] = [
    {
      index: 'skills',
      name: 'Job by skill',
      subItems: skills,
    },
    {
      index: 'companies',
      name: 'Job by company',
      subItems: companies,
    },
    {
      name: 'Job by city',
      subItems: {
        '/jobs?location=HCM': 'Ho Chi Minh',
        '/jobs?location=HN': 'Ha Noi',
        '/jobs?location=DN': 'Da Nang',
        '/jobs?location=Others': 'Others',
      },
    },
  ]

  useEffect(() => {
    const userItems: SubItem[] = [
      {
        index: 'account',
        name: 'My Account',
        subItems: {},
      },
      {
        index: userStore.user?.is_employer ? 'manager' : 'mapplied',
        name: userStore.user?.is_employer ? 'Manage Jobs' : 'Applied Job',
        subItems: {},
      },
      {
        index: '#',
        name: 'SignOut',
        subItems: {},
        onClick: () => {
          userStore.signOut()
        },
      },
    ]

    setUserItems(userItems)
  }, [userStore.user])

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
    <div className="header">
      <div className="nav">
        <Link to={'/'}>
          <img src={logo} height="100%" />
        </Link>
        <div className="links">
          <ul>
            <DropDown items={items}>
              <li>
                <Link to={'/jobs'}>All Jobs</Link>
              </li>
            </DropDown>
            <li>
              <Link to={'/reviews'}>IT Companies</Link>
            </li>
            <li className="search">
              {showSearch && (
                <SearchForm
                  onSubmit={onSubmit}
                  showSearchIcon={false}
                  defaultCity={'All'}
                />
              )}
            </li>
          </ul>
          <ul>
            {userStore.user ? (
              <DropDown items={userItems} className="user-items">
                <li>{userStore.user.name}</li>
              </DropDown>
            ) : (
              <>
                <li>
                  <Link to={'/for-employer'}>For Employers</Link>
                </li>
                <li>
                  <Link to={'/signin'}>Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export const Header = observer(HeaderFC)
