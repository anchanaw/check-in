// composables/auth.mock.ts
export const mockLoginResponse = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  user: {
    username: 'intern01',
    display_name: 'Intern One',
    role: 'intern'
  }
}

export const mockRegisterResponse = {
  success: true
}

export const mockRefreshResponse = {
  access_token: 'mock-access-token-new',
  refresh_token: 'mock-refresh-token-new'
}
