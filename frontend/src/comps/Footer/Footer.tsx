import { faFacebookSquare, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import './footer.scss'

export function Footer() {
  const links = [
    'About Us',
    'Home',
    'AI Match Services',
    'Contact Us',
    'All Jobs',
    'FAQ',
  ]

  const policy = [
    'Terms & Conditions',
    'Privacy Policy',
    'Operating Regulation',
    'Complaint Handling',
    'Terms & Conditions',
    'Press',
  ]

  return (
    <div className="footer">
      <div className="detail">
        <div className="links">
          {links.map((l, i) => (
            <Link className="link" to={'#'} key={i}>
              {l}
            </Link>
          ))}
        </div>
        <div className="policy">
          {policy.map((l, i) => (
            <Link className="link" to={'#'} key={i}>
              {l}
            </Link>
          ))}
        </div>
        <div className="copyright">
          <Link to={'#'}>Copyright © Placemint</Link>
          <Link to={'#'}>Tax code: xxxxxxxxxx</Link>
          <Link to={'#'}>
            <span className="icon">
              <FontAwesomeIcon icon={faFacebookSquare} />
            </span>
            <span className="icon">
              <FontAwesomeIcon icon={faYoutube} />
            </span>
          </Link>
          <Link to={'#'}>Ngô Lê Bảo Duy_17520397</Link>
          <Link to={'#'}>NT208.N11.ANTT</Link>
          <Link to={'#'}>Giảng viên hướng dẫn : thầy Trần Tuấn Dũng</Link>
        </div>
      </div>
      <div className="contact">
        <Link className="link" to={'#'}>
          Want to post a job? Contact us at:
        </Link>
        <Link className="link" to={'#'}>
          Ho Chi Minh: (+84) 977 460 519 - Ha Noi: (+84) 983 131 351 - Email:
          love@itviec.com
        </Link>
      </div>
    </div>
  )
}
