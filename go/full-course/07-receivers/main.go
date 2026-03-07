package main

import "fmt"


type User struct {
  Name string
  Email string
  Age int
}

// value receiver
func (u User) Notify() string {
  message := fmt.Sprintf("Sending email to %s <%s>", u.Name, u.Email)
  return message
}

// pointer receiver
func (u *User) ChangeName(name string) {
  u.Name = name
}

func main() {
  user := User{
    Name: "John Doe",
    Email: "john.doe@example.com",
    Age: 30,
  }

  fmt.Println(user.Notify())
  user.ChangeName("Jane Doe")
  fmt.Println(user.Notify())
}