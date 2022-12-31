import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../comps/Button'
import { Input } from '../../comps/Input'
import useStores from '../../stores'

import './employer.scss'

function EmployerFC() {
  const { jobStore, userStore } = useStores()

  const navigate = useNavigate()

  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('0')
  const [type, setType] = useState('1')
  const [compName, setCompName] = useState('')
  const [website, setWebsite] = useState('')
  const [logo, setLogo] = useState('')

  useEffect(() => {
    if (error) {
      console.log(error)
      setTimeout(() => setError(''), 3000)
    }
  }, [error])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    jobStore
      .createCompany({
        user_name: name,
        email,
        phone,
        password,
        location: Number(location),
        is_product: type == '1',
        company_name: compName,
        website,
        logo,
        about: '',
      })
      .then((res) => {
        if (res instanceof String) {
          setError(String(res))
        } else {
          userStore.setUser(res.token, res.user)
          navigate('/manager')
        }
      })
  }

  return (
    <div className="employer">
      <div className="dark">
        <div className="container">
          <div className="req">
            <div className="intro">
              <h1>Recruit great IT talents with ITviec</h1>
              <div className="req-des">
                <p>
                  Leave your contact so our Customer Love team can support you:
                </p>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faCheck} />
                    <div>
                      {' '}
                      Strengthen your Employer Brand with ITviec solutions
                    </div>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheck} />
                    <div>
                      {' '}
                      Create attractive Job Descriptions to approach quality IT
                      talents
                    </div>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheck} />
                    <div>
                      {' '}
                      Understand the IT Recruitment market with the latest
                      update
                    </div>
                  </li>
                </ul>
              </div>
              <div className="req-contact">
                <div>
                  <span>Hotline HCM</span>
                  <span>0977 460 519</span>
                </div>
                <div>
                  <span>Hotline Ha Noi</span>
                  <span>0983 131 351</span>
                </div>
              </div>
            </div>
            <div className="form">
              <div>
                <form onSubmit={onSubmit}>
                  <div>
                    <div className="lable">Full Name</div>
                    <Input
                      type="text"
                      placeholder="Mai Nguyen"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div>
                      <div className="lable">Work Email</div>
                      <Input
                        type="email"
                        placeholder="mainguyen@itviec.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <div className="lable">Phone Number</div>
                      <Input
                        type="text"
                        placeholder="0977460519"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="lable">Password</div>
                    <Input
                      type={'password'}
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="lable-top">Company Location</div>
                    <div className="choices">
                      <div>
                        <Input
                          type={'radio'}
                          name="location"
                          value={'0'}
                          checked={location == '0'}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <div className="lable">Ho Chi Minh</div>
                      </div>
                      <div>
                        <Input
                          type={'radio'}
                          name="location"
                          value={'1'}
                          checked={location == '1'}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <div className="lable">Ha Noi</div>
                      </div>
                      <div>
                        <Input
                          type={'radio'}
                          name="location"
                          value={'2'}
                          checked={location == '2'}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <div className="lable">Da Nang</div>
                      </div>
                      <div>
                        <Input
                          type={'radio'}
                          name="location"
                          value={'3'}
                          checked={location == '3'}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <div className="lable">Others</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="lable-top">Company Type</div>
                    <div className="choices">
                      <div>
                        <Input
                          type={'radio'}
                          name="type"
                          value={'1'}
                          checked={type == '1'}
                          onChange={(e) => setType(e.target.value)}
                        />
                        <div className="lable">Product</div>
                      </div>
                      <div>
                        <Input
                          type={'radio'}
                          name="type"
                          value={'0'}
                          checked={type == '0'}
                          onChange={(e) => setType(e.target.value)}
                        />
                        <div className="lable">Outsourcing</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="lable">Company Name</div>
                    <Input
                      type="text"
                      placeholder="IT Viec JSC"
                      required
                      value={compName}
                      onChange={(e) => setCompName(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="lable">Website</div>
                    <Input
                      type="text"
                      placeholder="https://itviec.com"
                      required
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="lable">Logo</div>
                    <Input
                      type="text"
                      placeholder="image url"
                      required
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                    />
                  </div>
                  {error && <div className="err">{error}</div>}
                  <div>
                    <Button>Create</Button>
                    <div>
                      <span>Already have an Employer account? </span>
                      <Link to={'/signin'}>Signin</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="light"></div>
    </div>
  )
}

export const Employer = observer(EmployerFC)
