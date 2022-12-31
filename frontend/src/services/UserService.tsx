import { User } from '../utils/types'
import axiosIntance from './custom_axios'

class UserService {
  async getInfo() {
    const res = await axiosIntance.get('/api/users/get/')
    return res.data as User
  }

  async signIn(email: string, password: string) {
    const res = await axiosIntance.post('/api/users/auth/', {
      email,
      password,
    })

    return {
      token: res.data.token as string,
      user: res.data.user as User,
    }
  }

  async signUp(name: string, email: string, password: string) {
    await axiosIntance.post('/api/users/', {
      name,
      email,
      password,
    })

    return await this.signIn(email, password)
  }

  async update(id: string, payload: Partial<User>) {
    const res = await axiosIntance.patch(`/api/users/${id}/`, payload)
    return res.data as User
  }

  async delete(id: string) {
    const res = await axiosIntance.delete(`/api/users/${id}/`)
    return Boolean(res.data)
  }
}

export default new UserService()
