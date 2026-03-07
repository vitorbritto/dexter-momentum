package main

import "fmt"

func sumAndProduct(a int, b int) (sum int, product int) {
	sum = a + b
	product = a * b
	return sum, product
}

func main() {
	sum, product := sumAndProduct(10, 5)
	fmt.Println("Sum:", sum, "Product:", product)
}