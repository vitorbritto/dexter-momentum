package main

import "fmt"

func main() {
	// Anonymous function
	func() {
		fmt.Println("Hello, World!")
	}()

	// Anonymous function with variable
	calc := func() {
		fmt.Println("Hello, World!")
	}

	calc()
}
