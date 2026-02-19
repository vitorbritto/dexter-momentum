package main

import "fmt"

// Pointer is a variable that stores the memory address of another variable.
// It is used to access the value of the variable directly.
// It is used to pass variables by reference.

func changeValue(number *int) int {	
	*number = *number * -1
	return *number
}

func main() {
	newNumber := 10
	fmt.Println(newNumber)
	changeValue(&newNumber)
	fmt.Println(newNumber)
}

