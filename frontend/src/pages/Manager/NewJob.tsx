import { FormEvent, useEffect, useRef, useState } from 'react'
import { Button } from '../../comps/Button'
import { Input } from '../../comps/Input'
import useStores from '../../stores'
import { Company, Job } from '../../utils/types'

interface Props {
  comp: Company
  onCancel: Function
  onDone: (job: Job) => void
  isEdit?: boolean
  job?: Job
}

export function NewJob({ onCancel, onDone, comp, isEdit = false, job }: Props) {
  const { appStore, jobStore } = useStores()

  const ref = useRef<HTMLFormElement>(null)

  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [skills, setSkills] = useState('')
  const [top3, setTop3] = useState('')
  const [level, setLevel] = useState('0')
  const [jd, setJd] = useState('')
  const [exp, setExp] = useState('')

  useEffect(() => {
    if (isEdit && job) {
      const details = job.detail.split('\n\n')

      setTitle(job.title)
      setLocation(job.location)
      setSalary(job.salary.toString())
      setSkills(job.skills.map((s) => s.name).join(', '))
      setLevel(job.level.toString() ?? '0')
      setTop3(details[1] ?? '')
      setJd(details[3] ?? '')
      setExp(details[5] ?? '')
    }
  }, [job])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }, [error])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    const sks = skills
      .split(',')
      .map((s) => s.trim())
      .map(
        (s) =>
          appStore.skills.find((ss) =>
            ss.name.toLowerCase().includes(s.toLowerCase())
          )?.id
      )
      .filter((s) => s) as any

    if (isEdit) {
      jobStore
        .updateJob(job?.id ?? '', {
          title,
          location,
          salary: Number(salary),
          level: Number(level),
          skills: sks,
          detail:
            'Top 3 Reasons To Join Us\n\n' +
            top3 +
            '\n\nJob Description\n\n' +
            jd +
            '\n\nYour Skills and Experience\n\n' +
            exp,
        })
        .then((res) => {
          if (res instanceof String) {
            setError(String(res))
          } else {
            onCancel()
            onDone(res)
          }
        })

      return
    }

    jobStore
      .createJob({
        title,
        location,
        salary: Number(salary),
        level: Number(level),
        skills: sks,
        of_company: comp.id,
        detail:
          'Top 3 Reasons To Join Us\n\n' +
          top3 +
          '\n\nJob Description\n\n' +
          jd +
          '\n\nYour Skills and Experience\n\n' +
          exp,
      })
      .then((res) => {
        if (res instanceof String) {
          setError(String(res))
        } else {
          setTitle('')
          setLocation('')
          setSalary('')
          setTop3('')
          setLevel('0')
          setJd('')
          setExp('')
          onCancel()
          onDone(res)
        }
      })
  }

  return (
    <div className="new-job">
      <div className="form">
        <div>
          <form
            onSubmit={onSubmit}
            ref={ref}
            id={isEdit ? 'editjobform' : 'newjobform'}
          >
            <div>
              <div className="lable">Title</div>
              <Input
                type="text"
                placeholder="Java Spring Boot..."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <div className="lable">Location</div>
              <Input
                type="text"
                placeholder="location..."
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <div className="lable">Salary</div>
              <Input
                type="number"
                placeholder="salary..."
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div>
              <div className="lable">Skills</div>
              <Input
                type="text"
                placeholder="(split by coma) Ex: Java, C++"
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <div>
                <div className="lable-top">Level</div>
                <div className="choices">
                  <div>
                    <Input
                      type={'radio'}
                      name="type"
                      value={'0'}
                      checked={level == '0'}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                    <div className="lable">Fresher</div>
                  </div>
                  <div>
                    <Input
                      type={'radio'}
                      name="type"
                      value={'1'}
                      checked={level == '1'}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                    <div className="lable">Junior</div>
                  </div>
                  <div>
                    <Input
                      type={'radio'}
                      name="type"
                      value={'2'}
                      checked={level == '2'}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                    <div className="lable">Senior</div>
                  </div>
                  <div>
                    <Input
                      type={'radio'}
                      name="type"
                      value={'3'}
                      checked={level == '3'}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                    <div className="lable">Manager</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="lable">Top 3 reason to join</div>
              <textarea
                placeholder="hight salary..."
                required
                value={top3}
                onChange={(e) => setTop3(e.target.value)}
              />
            </div>
            <div>
              <div className="lable">Job description</div>
              <textarea
                placeholder="hight salary..."
                required
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>
            <div>
              <div className="lable">Skills and Experience</div>
              <textarea
                placeholder="hight salary..."
                required
                value={exp}
                onChange={(e) => setExp(e.target.value)}
              />
            </div>
            {error && <div className="err">{error}</div>}
            <div></div>
          </form>
          <Button type="submit" form={isEdit ? 'editjobform' : 'newjobform'}>
            {isEdit ? 'Save' : 'Create'}
          </Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}
