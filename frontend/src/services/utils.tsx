import { Company, Job, Review, Skill } from '../utils/types'
import axiosIntance from './custom_axios'

class Utils {
  async getSkills() {
    const res = await axiosIntance.get('api/skills/')
    return res.data as Skill[]
  }

  async getCompanies() {
    const res = await axiosIntance.get('api/companies/')
    return res.data as Company[]
  }

  async getJobs(filters?: Record<string, string>) {
    const res = await axiosIntance.get('api/jobs/list_all/', {
      params: filters,
    })
    const jobs = res.data as Job[]

    return jobs.sort(
      (a, b) => new Date(b.updated).valueOf() - new Date(a.updated).valueOf()
    )
  }

  async getReviews(filters?: Record<string, string>) {
    const res = await axiosIntance.get('api/reviews/list_all/', {
      params: filters,
    })
    return res.data as Review[]
  }
}

export default new Utils()
