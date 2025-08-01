package main

import "fmt"

// Recursive function
func factorial(n uint) uint {
	if n == 0 {
		return 1
	}
	return n * factorial(n-1)
}

func fibonacci(n uint) uint {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
	slot := uint(15)
	fmt.Println(factorial(slot))
	fmt.Println(fibonacci(slot))
}
