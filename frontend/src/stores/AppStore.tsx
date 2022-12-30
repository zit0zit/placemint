import { makeAutoObservable } from 'mobx'
import utils from '../services/utils'
import { getRandomSubarray } from '../utils'
import { Company, Skill, TopCompany } from '../utils/types'

export default class AppStore {
  skills: Skill[]
  companies: Company[]

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

  setSkills(skills: Skill[]) {
    this.skills = skills
  }

  setCompanies(comps: Company[]) {
    this.companies = comps
  }

  async getTopCompanies() {
    const topComps = getRandomSubarray(this.companies, 8)
    const locations = ['Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Others']

    return await Promise.all(
      topComps.map(
        async (comp) =>
          ({
            ...comp,
            num: (await this.getJobs({ comp_id: comp.id })).length,
            city: locations[comp.location],
          } as TopCompany)
      )
    )
  }

  async getJobs(filters?: Record<string, string>) {
    return utils.getJobs(filters)
  }

  async getReviews(filters?: Record<string, string>) {
    return utils.getReviews(filters)
  }
}
