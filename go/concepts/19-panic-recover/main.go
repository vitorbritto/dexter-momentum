package main

import "fmt"

// Panic is used to stop the execution of the program and print an error message.
// It is used to stop the execution of the program and print an error message.

// Recover is used to recover from a panic.
// It is used to stop the panic and continue the execution of the program.
func recoverExecution() {
	if r := recover(); r != nil {
		fmt.Println("Execution recovered from panic:", r)
	}
}

// studentAverage is a function that calculates the average of two numbers and returns a boolean.
// It uses defer to call recoverExecution() to recover from a panic.
func studentAverage(n1, n2 float64) bool {
	defer recoverExecution()

	average := (n1 + n2) / 2
	if average > 6 {
		return true
	}
	if average < 6 {
		return false
	}

	panic("What? Average is 6! What should I do?")
}

// main is the main function that calls studentAverage and prints the result.
// It uses defer to call recoverExecution() to recover from a panic.
// It prints the result of the studentAverage function.
// It prints "End of program" after the execution of the program.

func main() {
	fmt.Println(studentAverage(6, 6))
	fmt.Println("End of program")
}