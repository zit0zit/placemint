import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import useStores from '../../stores'
import { DropDown, SubItem } from './DropDown'

import './header.scss'

export function Header() {
  const { appStore } = useStores()
  const [skills, setSkills] = useState({})
  const [companies, setCompanies] = useState({})

  useEffect(() => {
    appStore.getSkills().then((res) => {
      setSkills(
        res.slice(0, 32).reduce((acc: any, sk: any) => {
          const id = `/jobs?skill=${sk.id}`
          acc[id] = sk.name
          return acc
        }, {})
      )
    })

    appStore.getCompanies().then((res) => {
      setCompanies(
        res.slice(0, 24).reduce((acc: any, cp: any) => {
          const id = `/jobs?company=${cp.id}`
          acc[id] = cp.name
          return acc
        }, {})
      )
    })
  }, [])

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
          </ul>
          <ul>
            <li>
              <Link to={'/for-empolyer'}>For Employers</Link>
            </li>
            <li>
              <Link to={'/signin'}>Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
