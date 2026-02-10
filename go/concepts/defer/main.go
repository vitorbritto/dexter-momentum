package main

import "fmt"

// Defer is used to delay the execution of a function until the surrounding function returns.
// It is often used to ensure that a function is called even if an error occurs.
// It is also used to clean up resources, such as closing a file or database connection.

func studentAverage(n1, n2 float64) float64 {
	fmt.Println("Average calculated. Resulting in:")
	average := (n1 + n2) / 2
	return average
}

func feedback(average float64) string {
	if average >= 7 {
		return "Approved"
	}
	return "Disapproved"
}

func main() {
	fmt.Println(studentAverage(7.7, 8.1))
	defer fmt.Println(feedback(7.9))
}
