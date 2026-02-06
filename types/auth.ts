// types/auth.ts
export type UserRole = 'intern' | 'manager'

export type LoginResponse = {
  access_token: string
  refresh_token: string
  user: {
    role: UserRole
  }
}

export type RegisterResponse = {
  success: true
}
