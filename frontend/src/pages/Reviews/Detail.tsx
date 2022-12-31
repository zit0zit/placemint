import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowUpRightFromSquare,
  faGear,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../comps/Button'
import { Stars } from '../../comps/Stars'
import useStores from '../../stores'
import { Company, Review } from '../../utils/types'
import './style.scss'

const locations = ['Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Others']

function DetailFC({ id }: { id: string }) {
  const { appStore, userStore } = useStores()

  const navtigate = useNavigate()

  const [comp, setComp] = useState<Company | undefined>(undefined)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    appStore.getReviews({ comp_id: id }).then((res) => {
      setReviews(res)
    })
  }, [])

  useEffect(() => {
    const comp = appStore.companies.find((c) => c.id == id)
    setComp(comp)
  }, [appStore.companies, id])

  const onClick = () => {
    if (!userStore.isAuth) {
      navtigate('/signin')
    }
  }

  return (
    <div className="detail">
      {comp && (
        <>
          <div className="ch">
            <div className="ch-logo">
              <img src={comp.logo} />
            </div>
            <div className="ch-info">
              <h1>{comp.name}</h1>
              <div className="chi-items">
                <div className="chil">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{locations[comp.location ?? 3]}</span>
                </div>
                <div className="chip">
                  <FontAwesomeIcon icon={faGear} />
                  <span>
                    {comp.is_product ?? true ? 'Product' : 'Outsourcing'}
                  </span>
                </div>
              </div>
            </div>
            <div className="ch-actions">
              <Button onClick={onClick}>Write review</Button>
            </div>
          </div>
          <ul>
            {reviews.length > 0 && (
              <>
                <li>
                  <li>
                    <Link to={'/jobs?company=' + comp.id}>
                      <span>Jobs</span>
                    </Link>
                  </li>
                  <li>
                    <span>{reviews.length} Reviews</span>
                  </li>
                </li>
                <li>
                  <a href={comp.website} target="_blank">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                </li>
              </>
            )}
          </ul>
          <div className="rvs">
            <div>
              {reviews.length > 0 ? (
                <>
                  <div className="hl">
                    <h3>{`${reviews.length} Employee Reviews`}</h3>
                  </div>
                  {reviews.map((r, i) => (
                    <div className="rv" key={i}>
                      <div className="rvh">
                        <h3>{r.title}</h3>
                        <div className="rv-stars">
                          <div className="rvs-s">
                            <Stars value={+r.rate ?? 5} className="rvs-main" />
                            <div className="rvs-re">
                              {(+r.rate ?? 5) >= 3 ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    color="#68ba50"
                                  />{' '}
                                  Recommend
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon
                                    icon={faThumbsDown}
                                    color="#f0101a"
                                  />{' '}
                                  Doesn't recommend
                                </>
                              )}
                            </div>
                          </div>
                          <div className="rvs-sub">
                            <p>Salary & benefits</p>
                            <Stars
                              value={+r.rate_salary ?? 5}
                              className="rvss"
                            />
                            <p>Training & learning</p>
                            <Stars
                              value={+r.rate_training ?? 5}
                              className="rvss"
                            />
                            <p>Management cares about me</p>
                            <Stars
                              value={+r.rate_cares ?? 5}
                              className="rvss"
                            />
                            <p>Culture & fun</p>
                            <Stars value={+r.rate_fun ?? 5} className="rvss" />
                            <p>Office & workspace</p>
                            <Stars
                              value={+r.rate_workspace ?? 5}
                              className="rvss"
                            />
                          </div>
                          <div className="date">
                            {new Date(r.updated).toDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="rvb">
                        {r.content?.split('\n').map((c, i) => (
                          <div key={i}>{c}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="hl">
                  <h3>Not enough reviews for statistic yet.</h3>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export const Detail = observer(DetailFC)
