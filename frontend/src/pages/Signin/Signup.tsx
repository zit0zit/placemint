import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import robby from '../../assets/robboy.png'
import { Button } from '../../comps/Button'
import { Input } from '../../comps/Input'
import './signin.scss'

export function Signup() {
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
          <h2>Signup</h2>
          <form>
            <div>
              <div className="lable">
                Name
                <abbr> *</abbr>
              </div>
              <Input placeholder="Name" required />
            </div>
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
              <Button>Signup with Email</Button>
            </div>
            <div>
              <div className="link">
                Already have an account? <Link to={'/signin'}>Signin now!</Link>
              </div>
            </div>
          </form>
        </div>
        <div className="signin-right">
          <img src={robby} />
        </div>
      </div>
    </div>
  )
}
