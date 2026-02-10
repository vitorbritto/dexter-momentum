package main

import (
	"fmt"
	"time"
)

// The for loop is used to iterate over a range of values.
// It is the most common loop in Go.
// Struct does not work with for loop

// For loop with a single condition
func forLoop() {
	i := 0

	for i < 10 {
		i++
		fmt.Println(i)
		time.Sleep(time.Second)
	}

	fmt.Println("Done")
}

// For loop with a range
func forLoopWithRange() {
	numbers := []int{1, 2, 3, 4, 5}

	for i, number := range numbers {
		fmt.Println(i, number)
	}
}

// For loop with a range and without the index	
func forLoopWithRangeWithoutIndex() {
	numbers := []int{1, 2, 3, 4, 5}

	for _, number := range numbers {
		fmt.Println(number)
	}
}

// For loop using Map
func forLoopUsingMap() {
	numbers := map[string]string{"name": "John", "age": "20", "city": "New York"}

	for key, value := range numbers {
		fmt.Println(key, value)
	}
}

// Pooling with for loop
func poolingWithForLoop() {
	i := 0
	for {
		fmt.Println("GET Request")
		time.Sleep(time.Second * 5)

		if i == 5 {
			break
		}
		i++
	}
}

func main() {
	// forLoop()
	// forLoopWithRange()
	// forLoopWithRangeWithoutIndex()
	// forLoopUsingMap()
	poolingWithForLoop()
}
