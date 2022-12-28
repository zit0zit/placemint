import axiosIntance from './custom_axios'

class Utils {
  async getSkills() {
    const res = await axiosIntance.get('api/skills/')
    return res.data
  }

  async getCompanies() {
    const res = await axiosIntance.get('api/companies/')
    return res.data
  }
}

export default new Utils()

