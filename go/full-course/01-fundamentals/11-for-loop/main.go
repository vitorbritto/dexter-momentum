package main

import "fmt"

func main() {
	for i := 0; i < 5; i++ {
		fmt.Println("Value of i is: ", i)
	}

	// Infinite loop
	for {
		fmt.Println("Infinite loop")
	}
}