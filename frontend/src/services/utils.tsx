import axiosIntance from './custom_axios'

class Utils {
  async getSkills() {
    const res = await axiosIntance.get('api/skills/')
    return res.data as any[]
  }

  async getCompanies() {
    const res = await axiosIntance.get('api/companies/')
    return res.data as any[]
  }

  async getJobs(filters?: Record<string, string>) {
    const res = await axiosIntance.get('api/jobs/list_all/', {
      params: filters,
    })
    return res.data as any[]
  }
}

export default new Utils()
