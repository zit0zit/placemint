import {
  faFilter,
  faGreaterThanEqual,
  faLocationDot,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../../comps/Button'
import { Select } from '../../comps/Select'
import useStores from '../../stores'
import { dateDiff } from '../../utils'

import './job.scss'

const locations: Record<string, string> = {
  HCM: 'Ho Chi Minh',
  HN: 'Ha Noi',
  DN: 'Da Nang',
  Others: 'Others',
}

function JobsFC() {
  const { appStore } = useStores()
  const [params, setParams] = useSearchParams()

  const [jobs, setJobs] = useState<any[]>([])
  const [selectedJob, setSelectedJob] = useState(0)

  const [location, setLocation] = useState('Viet Nam')
  const [skill, setSkill] = useState('IT')

  const [level, setLevel] = useState('-1')
  const [salary, setSalary] = useState('-1')
  const [type, setType] = useState('-1')

  useEffect(() => {
    const filters: any = {}
    const search = params.get('search')
    const skill = params.get('skill')
    const comp = params.get('company')
    const title = params.get('title')
    const location = params.get('location')
    const level = params.get('level')
    const salary = params.get('salary')
    const type = params.get('type')

    if (skill) {
      filters['skill'] = skill
      setSkill(appStore.skills.find((s) => s.id == skill)?.name)
    } else {
      setSkill('IT')
    }

    if (search) {
      filters['title'] = search
      setSkill(search)
    } else {
      setSkill('IT')
    }

    if (comp) {
      filters['comp_id'] = comp
    }

    if (title) {
      filters['title'] = title
    }

    if (level) {
      filters['level'] = level
    }

    if (salary) {
      filters['salary'] = salary
    }

    if (type) {
      filters['product'] = type == '1' ? 'true' : 'false'
    }

    if (location) {
      filters['location'] = Object.keys(locations).findIndex(
        (i) => i == location
      )
      setLocation(locations[location])
    } else {
      setLocation('Viet Nam')
    }

    appStore
      .getJobs(filters)
      .then((res) => {
        setJobs(res)
      })
      .catch(() => {
        setJobs([])
      })
  }, [params])

  const onFilter = () => {
    const filter: any = {}

    if (level != '-1') {
      filter['level'] = level
    }

    if (salary != '-1') {
      filter['salary'] = salary
    }

    if (type != '-1') {
      filter['type'] = type
    }

    const olds: any = {}
    params.forEach((p, k) => (olds[k] = p))

    setParams(() => ({ ...olds, ...filter }))
  }

  const onApply = (job: any) => {}

  return (
    <div className="jobs">
      <div className="job-filter">
        <Select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value={-1} disabled>
            Job level
          </option>
          <option value={0}>Fresher</option>
          <option value={1}>Junior</option>
          <option value={2}>Senior</option>
          <option value={3}>Manager</option>
        </Select>
        <Select
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          optionIcon={<FontAwesomeIcon icon={faGreaterThanEqual} />}
        >
          <option value={-1} disabled>
            Salary Range
          </option>
          <option value={0}>500 USD</option>
          <option value={1}>1000 USD</option>
          <option value={2}>2000 USD</option>
          <option value={3}>2500 USD</option>
        </Select>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value={-1} disabled>
            Company Type
          </option>
          <option value={0}>Outsourcing</option>
          <option value={1}>Product</option>
        </Select>
        <Button className="blue" onClick={onFilter}>
          <FontAwesomeIcon icon={faFilter} />
        </Button>
        <div className="clear">
          <Link to={'/jobs'}>Clear all filters</Link>
        </div>
      </div>
      <div className="job-list">
        <div className="job-list-header">
          <div className="job-list-header-inner">
            {jobs.length > 0 ? (
              <h2>
                {jobs.length} {skill} Jobs in {location}
              </h2>
            ) : (
              <div className="notfound">
                <h2>Oops!</h2>
                <h3>The job you're looking for doesn't exist.</h3>
              </div>
            )}
            {jobs.map((j, i) => (
              <div
                key={i}
                className={'job-header' + (i == selectedJob ? ' selected' : '')}
                onClick={() => setSelectedJob(i)}
              >
                <div className="jh-logo">
                  <img src={j.of_company?.logo} />
                </div>
                <div className="jh-detail">
                  <div className="jhd-body">
                    <div className="jhdb-title">
                      <h3>{j.title}</h3>
                    </div>
                    <div className="jhdb-salary">
                      <FontAwesomeIcon icon={faSackDollar} />
                      <span>
                        {j.salary ? j.salary + ' USD' : "You'll love it"}
                      </span>
                    </div>
                  </div>
                  <div className="jhd-skill">
                    {j.skills?.map((s: any, i: number) => (
                      <Link key={i} to={'/jobs?skill=' + s?.id}>
                        {s?.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="jh-post">
                  <div className="jhp-city">
                    {Object.values(locations)[j.of_company?.location]}
                  </div>
                  <div className="jhp-date">
                    {dateDiff(new Date(j.updated), new Date())}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="job-preview">
          {jobs.length > 0 && jobs[selectedJob] && (
            <div className="job-detail">
              <div className="job-detail-header">
                <h1>{jobs[selectedJob]?.title}</h1>
                <div className="jdh-cpn">
                  {jobs[selectedJob]?.of_company?.name}
                </div>
                <div className="jdh-apply">
                  <Button
                    className="jdh-apply-btn"
                    onClick={() => onApply(jobs[selectedJob])}
                  >
                    Apply now
                  </Button>
                </div>
              </div>
              <div className="job-detail-overview">
                <div className="jhd-skill">
                  {jobs[selectedJob]?.skills?.map((s: any, i: number) => (
                    <Link key={i} to={'/jobs?skill=' + s?.id}>
                      {s?.name}
                    </Link>
                  ))}
                </div>
                <div className="jhdb-salary">
                  <FontAwesomeIcon icon={faSackDollar} />
                  <span>
                    {jobs[selectedJob]?.salary
                      ? jobs[selectedJob]?.salary + ' USD'
                      : "You'll love it"}
                  </span>
                </div>
                <div className="jdo-location">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{jobs[selectedJob]?.location}</span>
                  <span>
                    <a
                      href={
                        'https://google.com/maps?q=' +
                        jobs[selectedJob]?.location
                      }
                      target="_blank"
                    >
                      See map
                    </a>
                  </span>
                </div>
              </div>
              <div className="job-about">
                {jobs[selectedJob]?.detail
                  ?.split('\n\n')
                  .map((deltail: string, i: number) => (
                    <div className="ja-para" key={i}>
                      <ul>
                        {deltail.split('\n').map((d, i) => (
                          <li className="jap-li" key={i}>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
              <div className="job-company"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Jobs = observer(JobsFC)
