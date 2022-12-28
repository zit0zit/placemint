import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { DropDown, SubItem } from './DropDown'

import './header.scss'

export function Header() {
  const items: SubItem[] = [
    {
      index: 'skills',
      name: 'Job by skill',
      subItems: {
        '/skills/1': 'Java',
        '/skills/2': 'PHP',
        '/skills/3': 'JavaScript',
        '/skills/4': 'HTML5',
        '/skills/5': 'Manager',
        '/skills/6': 'SQL',
        '/skills/7': 'Android',
        '/skills/8': 'iOS',
        '/skills/9': 'MySQL',
        '/skills/10': 'Tester',
        '/skills/11': 'English',
        '/skills/12': 'Ruby',
        '/skills/13': 'Python',
        '/skills/14': 'Mobile Apps',
        '/skills/15': 'Ruby on Rails',
        '/skills/16': 'QA QC',
        '/skills/17': 'Database',
        '/skills/18': '.NET',
        '/skills/19': 'Business Analyst',
        '/skills/20': 'Linux',
        '/skills/21': 'Team Leader',
        '/skills/22': 'NodeJS',
        '/skills/23': 'System Engineer',
        '/skills/24': 'Designer',
        '/skills/25': 'UI-UX',
        '/skills/26': 'Project Manager',
        '/skills/27': 'OOP',
        '/skills/28': 'Oracle',
        '/skills/29': 'MVC',
        '/skills/30': 'ReactJS',
        '/skills/31': 'Embedded',
        '/skills/32': 'J2EE',
      },
    },
    {
      index: 'companies',
      name: 'Job by company',
      subItems: {
        '/companies/1': 'MB Bank',
        '/companies/2': 'NAB Innovation Centre Vietnam',
        '/companies/3': 'DEK Technologies',
        '/companies/4': 'GFT Technologies Vietnam',
        '/companies/5': 'Viettel Group',
        '/companies/6': 'NFQ Asia',
        '/companies/7': 'Niteco Vietnam Co., Ltd',
        '/companies/8': 'Hybrid Technologies',
        '/companies/9': 'NEC Vietnam',
        '/companies/10': 'Daoukiwoom Innovation',
        '/companies/11': 'Binance',
        '/companies/12': 'Timo',
        '/companies/13': 'Capgemini Vietnam',
        '/companies/14': 'MONEY FORWARD VIETNAM CO.,LTD',
        '/companies/15': 'Global Fashion Group',
        '/companies/16': 'DSquare',
        '/companies/17': 'BAEMIN Vietnam (Woowa Bros.)',
        '/companies/18': 'SMG Swiss Marketplace Group',
        '/companies/19': 'Skedulo Vietnam',
        '/companies/20': 'Titan Technology Corporation',
        '/companies/21': 'Asilla',
        '/companies/22': 'VUS',
        '/companies/23': 'Fullerton Health',
        '/companies/24': 'Yojee',
      },
    },
    {
      name: 'Job by city',
      subItems: {
        '0': 'Ho Chi Minh',
        '1': 'Ha Noi',
        '2': 'Da Nang',
        '3': 'Others',
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
