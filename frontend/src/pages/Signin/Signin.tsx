import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Button } from '../../comps/Button'
import { Input } from '../../comps/Input'
import useStores from '../../stores'
import './signin.scss'

function SigninFC() {
  const { userStore } = useStores()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (userStore.isAuth) {
      navigate('/')
    }
  }, [userStore.isAuth])

  useEffect(() => {
    if (error) {
      console.log(error)
      setTimeout(() => setError(''), 3000)
    }
  }, [error])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    userStore.signIn(email, password).then((user) => {
      if (user instanceof String) {
        setError(String(user))
      } else {
        navigate('/')
      }
    })
  }

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
          <form onSubmit={onSubmit}>
            <div>
              <div className="lable">
                Email Address
                <abbr> *</abbr>
              </div>
              <Input
                placeholder="Email"
                type={'email'}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="lable">
                Password
                <abbr> *</abbr>
              </div>
              <Input
                placeholder="Password"
                type={'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="err">{error}</div>}
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

export const Signin = observer(SigninFC)
