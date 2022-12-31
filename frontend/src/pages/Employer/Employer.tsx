import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Button } from '../../comps/Button'
import { Input } from '../../comps/Input'

import './employer.scss'

export function Empolyer() {
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
                <form>
                  <div>
                    <div className="lable">Full Name</div>
                    <Input type="text" placeholder="Mai Nguyen" required />
                  </div>
                  <div className="row">
                    <div>
                      <div className="lable">Work Email</div>
                      <Input
                        type="email"
                        placeholder="mainguyen@itviec.com"
                        required
                      />
                    </div>
                    <div>
                      <div className="lable">Phone Number</div>
                      <Input type="text" placeholder="0977460519" required />
                    </div>
                  </div>
                  <div>
                    <div className="lable">Password</div>
                    <Input type={'password'} placeholder="Password" required />
                  </div>
                  <div>
                    <div className="lable-top">Company Location</div>
                    <div className="choices">
                      <div>
                        <Input type={'radio'} name="location" id="cl-hcm" />
                        <div className="lable">Ho Chi Minh</div>
                      </div>
                      <div>
                        <Input type={'radio'} name="location" />
                        <div className="lable">Ha Noi</div>
                      </div>
                      <div>
                        <Input type={'radio'} name="location" />
                        <div className="lable">Da Nang</div>
                      </div>
                      <div>
                        <Input type={'radio'} name="location" />
                        <div className="lable">Others</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="lable-top">Company Type</div>
                    <div className="choices">
                      <div>
                        <Input type={'radio'} name="type" />
                        <div className="lable">Product</div>
                      </div>
                      <div>
                        <Input type={'radio'} name="type" />
                        <div className="lable">Outsourcing</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="lable">Company Name</div>
                    <Input type="text" placeholder="IT Viec JSC" required />
                  </div>
                  <div>
                    <div className="lable">Website</div>
                    <Input
                      type="text"
                      placeholder="https://itviec.com"
                      required
                    />
                  </div>
                  <div>
                    <div className="lable">Logo</div>
                    <Input type="text" placeholder="image url" required />
                  </div>
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
