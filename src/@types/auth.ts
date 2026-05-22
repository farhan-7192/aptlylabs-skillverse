export type AuthCredentials = {
  email: string
  password: string
}

export type SignupPayload = AuthCredentials & {
  name: string
}
