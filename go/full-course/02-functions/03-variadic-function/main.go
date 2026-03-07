package main

import "fmt"

func sum(numbers ...int) int {
	total := 0
	for _, number := range numbers {
		total += number
	}
	return total
}

func main() {
	sum := sum(1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50)
	fmt.Println(sum)
}
