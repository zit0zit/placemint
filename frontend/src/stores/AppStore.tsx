import { makeAutoObservable } from 'mobx'
import utils from '../services/utils'

export default class AppStore {
  constructor() {
    makeAutoObservable(this)
  }

  async getSkills() {
    return utils.getSkills()
  }

  async getCompanies() {
    return utils.getCompanies()
  }
}
