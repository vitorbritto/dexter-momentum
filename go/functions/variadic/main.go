package main

import "fmt"

// Variadic function
func sum(numbers ...int) int {
	total := 0
	for _, number := range numbers {
		total += number
	}
	return total
}

// Fixed params with variadic params
func sum2(a int, b int, numbers ...int) int {
	total := a + b
	for _, number := range numbers {
		total += number
	}
	return total
}

func main() {
	// Variadic function
	fmt.Println(sum(1, 10, 25, 30, 40, 65))

	// Fixed params with variadic params
	fmt.Println(sum2(10, 20, 30, 40))
}
