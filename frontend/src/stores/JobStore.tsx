import { makeAutoObservable } from 'mobx'
import JobService from '../services/JobService'
import { Company, CreateCompany, CreateJob, Job } from '../utils/types'

export default class JobStore {
  constructor() {
    makeAutoObservable(this)
  }

  async getCompany() {
    return await JobService.getCompany().catch(
      (err: any) => new String(JSON.stringify(err?.response?.data))
    )
  }

  async createCompany(payload: CreateCompany) {
    return await JobService.createCompany(payload).catch((err: any) => {
      if (Array.isArray(err?.response?.data)) {
        const errs = err.response.data as any[]
        for (let err of errs) {
          if (String(err).includes('api_user_email_key')) {
            return new String('this email existed.')
          }
        }
      }
      return new String(JSON.stringify(err?.response?.data))
    })
  }

  async updateCompany(id: string, payload: Partial<Company>) {
    return await JobService.updateCompany(id, payload).catch(
      (err: any) => new String(JSON.stringify(err?.response?.data))
    )
  }

  async deleteCompany(id: string) {
    return await JobService.deleteCompany(id).catch(
      (err: any) => new String(JSON.stringify(err?.response?.data))
    )
  }

  async createJob(payload: CreateJob) {
    return await JobService.createJob(payload).catch((err: any) => {
      if (Array.isArray(err?.response?.data)) {
        const errs = err.response.data as any[]
        console.log(err.response.data)
        for (let err of errs) {
          if (String(err).includes('api_job_title_of_company_id')) {
            return new String('this job title existed.')
          }
        }
      }
      return new String(JSON.stringify(err?.response?.data))
    })
  }

  async updateJob(id: string, payload: Partial<Job>) {
    return await JobService.updateJob(id, payload).catch((err: any) => {
      const errs = err.response.data as any[]
      for (let err of errs) {
        if (String(err).includes('api_job_title_of_company_id')) {
          return new String('this job title existed.')
        }
      }

      const res = new String(JSON.stringify(err?.response?.data))
      if (res.includes('api_job_title_of_company_id')) {
        return new String('this job title existed.')
      }

      return res
    })
  }

  async deleteJob(id: string) {
    return await JobService.deleteJob(id).catch(
      (err: any) => new String(JSON.stringify(err?.response?.data))
    )
  }
}
