class User {
  constructor(username, email, phone, token) {
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.token = token;
  }
  
  createUser({
  username,
  email,
  phone,
  token,
}) {
    console.log('Creating user...')
    
    return {
      username,
      email,
      phone,
      token
    }
  }
}

const user = new User()

user.createUser({
  username: 'Vitor Britto',
  email: 'vb@email.com',
  phone: '71981081506',
  token: 'abc123'
})