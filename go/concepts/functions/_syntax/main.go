package main

import "fmt"

// n1, n2 int -> int
func add(n1 int, n2 int) int {
	return n1 + n2
}

// n1, n2 int -> int
func sub(n1 int, n2 int) int {
	return n1 - n2
}

// n1, n2 int -> int
func mul(n1 int, n2 int) int {
	return n1 * n2
}

// n1, n2 int -> float32
func div(n1 int, n2 int) float32 {
	return float32(n1) / float32(n2)
}

func calculate(n1 int, n2 int) (int, int, int, float32) {
	add := add(n1, n2)
	sub := sub(n1, n2)
	mul := mul(n1, n2)
	div := div(n1, n2)

	return add, sub, mul, div
}

func main() {
	add := add(1, 2)
	fmt.Println(add)

	sub := sub(1, 2)
	fmt.Println(sub)

	mul := mul(1, 2)
	fmt.Println(mul)

	div := div(1, 2)
	fmt.Println(div)

	// Return all results
	result1, result2, result3, result4 := calculate(1, 2)
	fmt.Println(result1, result2, result3, result4)

	// Ignore some results
	result5, _, _, _ := calculate(1, 2)
	fmt.Println(result5)
}
