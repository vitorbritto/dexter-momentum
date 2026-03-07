package main

import (
	"fmt"

	"modules/internal/types"
	"modules/internal/utils"
)

func main() {
	user := types.User{
		Name: "John Doe",
		Email: "john.doe@example.com",
		Age: 30,
	}
	fmt.Println(utils.Notify(user))
} 