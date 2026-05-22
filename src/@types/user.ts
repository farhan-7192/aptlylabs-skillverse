export type UserRole = 'admin' | 'member' | 'viewer'

export type User = {
  id: string
  email: string
  name: string
  roles: UserRole[]
  permissions: string[]
}
