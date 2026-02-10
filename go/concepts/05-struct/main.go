package main

import (
	"fmt"
	"math/rand"

	"github.com/go-faker/faker/v4"
)

type User struct {
	ID       int
	Name     string
	Document string
	Email    string
	Phone    string
}

func fakerName() string {
	return faker.Name()
}

func main() {
	var users []User
	for i := 1; i <= 10; i++ {
		user := User{
			ID:       i,
			Name:     fakerName(),
			Document: fmt.Sprintf("%011d", rand.Int63n(10000000000)),
			Email:    fmt.Sprintf("user%d@example.com", i),
			Phone:    fmt.Sprintf("555-000%d", i),
		}
		users = append(users, user)
	}

	fmt.Printf("%-5s %-25s %-15s %-25s %-12s\n", "ID", "Name", "Document", "Email", "Phone")
	for _, user := range users {
		fmt.Printf("%-5d %-25s %-15s %-25s %-12s\n", user.ID, user.Name, user.Document, user.Email, user.Phone)
	}
}
