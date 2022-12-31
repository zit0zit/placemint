import { Company, CreateCompany, CreateJob, Job, User } from '../utils/types'
import axiosIntance from './custom_axios'

class JobService {
  async getCompany() {
    const res = await axiosIntance.get('/api/companies/get/')
    return res.data as Company
  }

  async createCompany(payload: CreateCompany) {
    const res = await axiosIntance.post('/api/companies/new/', payload)
    return {
      token: res.data?.token as string,
      user: res.data?.user as User,
    }
  }

  async updateCompany(id: string, payload: Partial<Company>) {
    const res = await axiosIntance.patch(`/api/companies/${id}/`, payload)
    return res.data as Company
  }

  async deleteCompany(id: string) {
    const res = await axiosIntance.delete(`/api/companies/${id}/`)
    return Boolean(res.data)
  }

  async createJob(payload: CreateJob) {
    const res = await axiosIntance.post('/api/jobs/new/', payload)
    return res.data as Job
  }

  async updateJob(id: string, payload: Partial<Job>) {
    const res = await axiosIntance.patch(`/api/jobs/${id}/`, payload)
    return res.data as Job
  }

  async deleteJob(id: string) {
    const res = await axiosIntance.delete(`/api/jobs/${id}/`)
    return Boolean(res.data)
  }
}

export default new JobService()
