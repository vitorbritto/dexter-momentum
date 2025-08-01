package main

import "fmt"

// - Control structures are used to control the flow of execution of a program
// - Control structures are used to make decisions
// - Control structures are used to repeat actions

func main() {
	// If statement
	if 2 > 1 {
		fmt.Println("2 is greater than 1")
	}

	// If-else statement
	if 2 > 1 {
		fmt.Println("2 is greater than 1")
	} else {
		fmt.Println("2 is not greater than 1")
	}

	// If-else-if statement
	if 2 > 1 {
		fmt.Println("2 is greater than 1")
	} else if 2 == 1 {
		fmt.Println("2 is equal to 1")
	} else {
		fmt.Println("2 is not greater than 1")
	}

	// If initialisation statement
	if x := 2; x > 1 {
		fmt.Println("x is greater than 1")
	}
}
