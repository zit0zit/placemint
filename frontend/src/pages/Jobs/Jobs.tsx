import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useStores from '../../stores'

export function Jobs() {
  const { appStore } = useStores()
  const [params, _setParams] = useSearchParams()

  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    const filters: any = {}
    const skill = params.get('skill')
    const comp = params.get('company')
    const title = params.get('title')
    const location = params.get('location')

    if (skill) {
      filters['skill'] = skill
    }

    if (comp) {
      filters['comp_id'] = comp
    }

    if (title) {
      filters['title'] = title
    }

    if (location) {
      filters['location'] = ['HCM', 'HN', 'DN', 'Others'].findIndex(
        (i) => i == location
      )
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

  useEffect(() => {
    console.log(jobs)
  }, [jobs])

  return (
    <div className="jobs">
      {jobs.map((j) => (
        <div key={j.id}>{j.title}</div>
      ))}
    </div>
  )
}
