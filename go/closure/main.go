package main

import "fmt"

// Closure is a function that returns a function.
// It is used to create a function that can be used to modify a variable.

func closure() func() int {
	total := 0
	return func() int {
		total += 1
		return total
	}
}

func main() {
	total := 10
	fmt.Println(total)

	fnTotal := closure()
	fmt.Println(fnTotal())
}
