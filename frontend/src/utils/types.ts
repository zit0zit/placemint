export type NullAble<T> = T | null

export interface Model {
  created: Date | string
  updated: Date | string
}

export interface Skill extends Model {
  id: string
  name: string
}

export interface Company extends Model {
  id: string
  name: string
  logo: string
  website: string
  phone: string
  location: number
  is_product: boolean
  about: string
  rate?: number
}

export interface Job extends Model {
  id: string
  title: string
  salary: number
  level: number
  location: string
  detail: string
  of_company: Company
  skills: Skill[]
}

export interface User extends Model {
  email: string
  id: string
  is_employer: boolean
  name: string
  password: string
  work_at?: string
}

export interface Review extends Model {
  title: number
  content: string
  for_company: Company
  user: User
  rate: number
  rate_salary: number
  rate_training: number
  rate_cares: number
  rate_fun: number
  rate_workspace: number
}

export interface TopCompany {
  id: string
  name: string
  num: number
  city: string
  logo: string
}

interface ExcludeComp {
  id: any
  name: any
  is_employer: any
  updated: any
  created: any
}

export interface CreateCompany
  extends Omit<Company, keyof ExcludeComp>,
    Omit<User, keyof ExcludeComp> {
  company_name: string
  user_name: string
}

interface ExcludeJob {
  id: any
  skills: any
  updated: any
  created: any
}

export interface CreateJob extends Omit<Job, keyof ExcludeJob> {
  skills: string[]
}
