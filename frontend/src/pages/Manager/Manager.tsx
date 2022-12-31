import { faGear, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../comps/Button'
import useStores from '../../stores'
import { Company, Job, NullAble } from '../../utils/types'
import { JobList } from '../Jobs/Jobs'

import './manager.scss'

const locations = ['Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Others']

function ManagerFC() {
  const { appStore, userStore, jobStore } = useStores()

  const navigate = useNavigate()

  const [comp, setComp] = useState<NullAble<Company>>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState(0)

  useEffect(() => {
    jobStore.getCompany().then((comp) => {
      if (!(comp instanceof String)) {
        setComp(comp)

        appStore.getJobs({ comp_id: comp.id }).then((jobs) => setJobs(jobs))
      }
    })
  }, [])

  useEffect(() => {
    if (!userStore.user || !userStore.user.is_employer) {
      setTimeout(() => {
        if (!userStore.user || !userStore.user.is_employer) navigate('/')
      }, 300)
    }
  }, [userStore.user])

  const onClick = () => {
    if (!userStore.isAuth) {
    }
  }

  return (
    <div className="manager">
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
                <Button onClick={onClick}>New Job</Button>
              </div>
            </div>
          </>
        )}
      </div>
      <br />
      <br />
      <div className="manager-jobs">
        <JobList
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          show={false}
          onAction={() => {}}
        />
      </div>
    </div>
  )
}

export const Manager = observer(ManagerFC)
