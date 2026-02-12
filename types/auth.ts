// types/auth.ts
export type UserRole = 'intern' | 'manager' | 'mentor'

export type LoginResponse = {
  data(data: any, arg1: null, arg2: number): any
  access_token: string
  refresh_token: string
  user: {
    role: UserRole
  }
}

export type RegisterResponse = {
  success: true
}
