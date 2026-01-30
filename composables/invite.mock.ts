export type InviteType = 'register' | 'team_change' | 'intern' | 'invalid'

export const mockInviteResponse = (
  inviteType: InviteType = 'register'
) => {
  if (inviteType === 'invalid') {
    return { valid: false }
  }

  return {
    valid: true,
    invite_type: inviteType,
    mentor: {
      display_name: 'จตุรงค์ ศรีสุข'
    },
    team: {
      token: 'FrontendDev2024',
    }
  }
}
