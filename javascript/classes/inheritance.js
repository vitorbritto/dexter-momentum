class User {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
  
  about({
    name,
    age
  }) {
    console.log(`Hy! I'm ${name}. I'm ${age} years old.`)
  }
}


class Employee extends User {
  constructor(name, age, status) {
    super(name, age)
    this.status = status
  }
  
  create({
    name,
    age,
    status
  }) {
    console.log('Creating Employment...')
    
    return {
      name,
      age,
      status
    }
  }
}

const employment = new Employee()

employment.about({
  name: 'Vitor Britto',
  age: 44,
})

employment.create({
    name: 'Vitor Britto',
    age: 44,
    status: 'working'
})