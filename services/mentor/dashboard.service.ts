export type MentorOverview = {
  internCount: number
  taskToReview: number
  leaveRequests: number
}

export const getMentorDashboard = async (): Promise<MentorOverview> => {
  // 🔹 MOCK ตอนนี้
  await new Promise((r) => setTimeout(r, 800))

  return {
    internCount: 5,
    taskToReview: 3,
    leaveRequests: 1
  }

  // 🔹 API จริงในอนาคต
  // return await $fetch('/api/mentor/dashboard')
}
