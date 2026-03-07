// Struct is:
// - a collection of fields
// - a value type
// - a composite type
// - a user-defined type (defined by the user)
// - a type that is defined by the user (defined by the user)

package main

import "fmt"

type Address struct {
  Street string
  City string
  State string
  Zip string
}

type User struct {
  Name string
  Email string
  Age int
  Address Address
}

func main() {
  user := User{
    Name: "John Doe",
    Email: "john.doe@example.com",
    Age: 30,
    Address: Address{
      Street: "123 Main St",
      City: "Anytown",
      State: "CA",
      Zip: "12345",
    },
  }

  fmt.Println(user)
  fmt.Println(user.Name)
  fmt.Println(user.Email)
  fmt.Println(user.Age)
  fmt.Println(user.Address)
  fmt.Println(user.Address.Street)
  fmt.Println(user.Address.City)
  fmt.Println(user.Address.State)
  fmt.Println(user.Address.Zip)
}
