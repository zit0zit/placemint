import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import robby from '../../assets/robboy.png'
import { Button } from '../../comps/Button'
import { Input } from '../../comps/Input'
import useStores from '../../stores'
import './signin.scss'

export function Signup() {
  const { userStore } = useStores()

  const navigate = useNavigate()

  const [name, setName] = useState('')
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
    userStore.signUp(name, email, password).then((user) => {
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
          <h2>Signup</h2>
          <form onSubmit={onSubmit}>
            <div>
              <div className="lable">
                Name
                <abbr> *</abbr>
              </div>
              <Input
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
