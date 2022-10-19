interface User {
    id: string
    firsName: string
    lastName: string
    email: string
    provider: 'firebase' | 'google'
}

export default User
