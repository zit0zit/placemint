import { makeAutoObservable } from 'mobx'
import utils from '../services/utils'
import { getRandomSubarray } from '../utils'

export default class AppStore {
  skills: any[]
  companies: any[]

  constructor() {
    makeAutoObservable(this)
    this.skills = []
    this.companies = []

    this.getSkillsAndComps()
  }

  async getSkillsAndComps() {
    const skills = await utils.getSkills()
    const comps = await utils.getCompanies()

    this.setSkills(skills)
    this.setCompanies(comps)
  }

  setSkills(skills: any[]) {
    this.skills = skills
  }

  setCompanies(comps: any[]) {
    this.companies = comps
  }

  async getTopCompanies() {
    const topComps = getRandomSubarray(this.companies, 8)
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

  async getJobs(filters?: Record<string, string>) {
    return utils.getJobs(filters)
  }
}
