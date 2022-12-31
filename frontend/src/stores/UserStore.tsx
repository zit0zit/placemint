import { makeAutoObservable } from 'mobx'
import UserService from '../services/UserService'
import { NullAble, User } from '../utils/types'

export default class UserStore {
  isAuth: boolean = false
  user: NullAble<User> = null

  constructor() {
    makeAutoObservable(this)
  }

  storeToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  removeToken() {
    localStorage.removeItem('token')
  }

  setUser(token: string, user: User) {
    this.storeToken(token)
    this.isAuth = true
    this.user = user
  }

  async signIn(email: string, password: string) {
    try {
      const data = await UserService.signIn(email, password)

      this.isAuth = true
      this.user = data.user
      this.storeToken(data.token)
      return data.user
    } catch (err: any) {
      const data = err.response?.data
      if (data?.email) {
        return new String(data.email?.[0])
      }
      if (data?.detail) {
        return new String('email or password not matched')
      }
    }
  }

  async signUp(name: string, email: string, password: string) {
    try {
      const data = await UserService.signUp(name, email, password)

      if (data) {
        this.isAuth = true
        this.user = data.user
        this.storeToken(data.token)
        return data.user
      }
    } catch (err: any) {
      const data = err.response?.data
      if (data.email) {
        return new String(data.email?.[0])
      }
      if (data.password) {
        return new String(data.password?.[0])
      }
      if (data.detail) {
        return new String('email or password not matched')
      }
    }
  }

  async update(payload: Partial<User>) {
    if (!this.isAuth || !this.user) {
      return null
    }

    const data = await UserService.update(this.user.id, payload).catch(
      (err) => {
        console.log(err)
        return null
      }
    )

    if (data) {
      this.user = data
      return data
    }

    return null
  }

  signOut() {
    this.isAuth = false
    this.user = null
    this.removeToken()
  }

  isSignedIn() {
    return this.getToken() != null
  }

  async loadUser() {
    const user = await UserService.getInfo().catch(() => null)
    if (user) {
      this.isAuth = true
      this.user = user
    } else {
      this.signOut()
    }
  }
}
