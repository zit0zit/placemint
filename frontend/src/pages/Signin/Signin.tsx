import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Button } from '../../comps/Button'
import { Input } from '../../comps/Input'
import './signin.scss'

export function Signin() {
  return (
    <div className="signin">
      <div className="wrapper">
        <div className="signin-header">
          <h3>
            Welcome to
            <img src={logo} />
          </h3>
        </div>
        <div className="signin-left">
          <form>
            <div>
              <div className="lable">
                Email Address
                <abbr> *</abbr>
              </div>
              <Input placeholder="Email" type={'email'} required />
            </div>
            <div>
              <div className="lable">
                Password
                <abbr> *</abbr>
              </div>
              <Input placeholder="Password" type={'password'} required />
            </div>
            <div>
              <Button>Signin with Email</Button>
            </div>
            <div>
              <div className="link">
                Do not have an account? <Link to={'/signup'}>Sign up now!</Link>
              </div>
            </div>
          </form>
        </div>
        <div className="signin-right">
          <h2>
            Sign in to get instant access to thousands of reviews and salary
            information
          </h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCheck} />
              <span>
                View salary to help you negotiate your offer or pay rise
              </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} />
              <span>
                Find out about benefits, interview, company culture via reviews
              </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} />
              <span>Easy apply with only 1 click</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} />
              <span>Manage your own profile & privacy</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
