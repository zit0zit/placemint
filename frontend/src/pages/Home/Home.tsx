import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchForm } from '../../comps/SearchForm'
import useStores from '../../stores'
import { getRandomSubarray } from '../../utils'
import './home.scss'

export function Home() {
  const { appStore } = useStores()

  const [topSkill, setTopSkill] = useState<Record<string, string>>({})
  const [topCompanies, setTopCompanies] = useState<Record<string, any>>({})

  useEffect(() => {
    appStore.getSkills().then((res) => {
      setTopSkill(
        getRandomSubarray(res, 8).reduce((acc: any, sk: any) => {
          const id = `/jobs?skill=${sk.id}`
          acc[id] = sk.name
          return acc
        }, {})
      )
    })

    setTopCompanies({
      '/companies/?id=1': {
        name: 'ITviec',
        num: '2',
        city: 'Ho Chi Minh',
        logo: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNTk4REE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--346af267b763bf8e2debf8d511068b58a8b6a26c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/itviec-logo.jpg',
      },

      '/companies/?id=6': {
        name: 'Beincom',
        num: '4',
        city: 'Ho Chi Minh',
        logo: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNklBS3c9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--608deec764b9d9c9cd29e1b7f73827d2ef55a06a/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/Group.png',
      },

      '/companies/?id=11': {
        name: 'MB Bank',
        num: '13',
        city: 'Ha Noi',
        logo: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMmZvSXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--a72d8a6545664966af9f6674fde5e1164b55ced4/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/Logo%20MB%20he%20mau%20RGB%2001.png',
      },

      '/companies/?id=16': {
        name: 'NAB Innovation Centre Vietnam',
        num: '10',
        city: 'Ho Chi Minh',
        logo: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMS9LSnc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--fe7630a1b8dc86588cc58166a2de3ae8236fbf3c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/logo.jpg',
      },

      '/companies/?id=21': {
        name: 'LG Electronics Development Vietnam (LGEDV)',
        num: '5',
        city: 'Ha Noi',
        logo: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM3d3REE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--80a5e94da84295f7b4d0feae6f2e6cb58eb1e369/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/lg-development-center-vietnam-logo.png',
      },

      '/companies/?id=26': {
        name: 'Titan Technology Corporation',
        num: '6',
        city: 'Ho Chi Minh',
        logo: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMk9oRmc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--81a7f3a42024208970726726ac3dd2837cec7441/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/Logo_Official.jpg',
      },

      '/companies/?id=31': {
        name: 'Trung tâm công nghệ thông tin MobiFone',
        num: '4',
        city: 'Da Nang',
        logo: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMXU1S1E9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c174e40304d5840f9968a325ee87dcd5aed17d7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/logo.png',
      },

      '/companies/?id=36': {
        name: 'FPT Software',
        num: '4',
        city: 'Ho Chi Minh',
        logo: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOEJwSFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--61bb4901a74cef186408525de025b905e8ecf1ea/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/logo%20FSOFT%20d%E1%BB%8Dc.png',
      },
    })
  }, [])

  const onSubmit = ({}) => {}

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
