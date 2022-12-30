import { getRandomSubarray } from '../utils'
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

  async getTopCompanies() {
    const topComps = getRandomSubarray(await this.getCompanies(), 8)
    const locations = ['Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Others']

    return await Promise.all(
      topComps.map(async (comp) => ({
        id: comp.id,
        name: comp.name,
        num: (await this.getJobs({ comp_id: comp.id })).length,
        city: locations[comp.location],
        logo: comp.logo,
      }))
    )
  }
}

export default new Utils()
