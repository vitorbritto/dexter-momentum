package main

import "fmt"

// Pointer is a variable that stores the address of another variable.
// Pointer is a reference to a memory address

// *int -> Pointer to an integer
// & -> Address of
// * -> Value of

type User struct {
	Name  string
	Email string
}

// Pass by value
// - The function receives a copy of the user struct
// - The function does not modify the original user struct
// - The function does not return a value
func PrintUser(u User) {
	fmt.Println(u.Name, u.Email)
}

// Pass by reference
// - The function receives a pointer to the user struct
// - The function can modify the original user struct
// - The function can return a value
// - The function can modify the original user struct
func PrintUserPtr(u *User) {
	fmt.Println(u.Name, u.Email)
}

func main() {
	user := User{
		Name:  "John Doe",
		Email: "john.doe@example.com",
	}

	PrintUser(user)
	PrintUserPtr(&user)
}
