package main

import "fmt"

// Stablish a contract
type Notifier interface {
	Notify()
}

// Define a struct
type User struct {
	Name string
	Email string
}

// Implement the method Notify
func (u *User) Notify() {
	fmt.Println("Sending email to", u.Name, u.Email)
}

// Use the contract
func SendNotification(n Notifier) {
	n.Notify()
}


func main() {
	user := User{
		Name: "John Doe",
		Email: "john.doe@example.com",
	}
	SendNotification(&user)
}