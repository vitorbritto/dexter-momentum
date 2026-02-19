package main

import "fmt"

type User struct {
	Name string
	Email string
}

func (u User) Notify() {
	fmt.Println("Sending email to", u.Name, u.Email)
}

func main() {
	user := User{
		Name: "John Doe",
		Email: "john.doe@example.com",
	}
	user.Notify()
}
