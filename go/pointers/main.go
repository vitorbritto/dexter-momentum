package main

import "fmt"

// Pointer is a variable that stores the address of another variable.
// Pointer is a reference to a memory address

// *int -> Pointer to an integer
// & -> Address of
// * -> Value of

func main() {
	num := 10
	numPtr := &num // Pointer to num
	fmt.Println(numPtr) // -> Address of num
	fmt.Println(*numPtr) // -> Dereferencing

	*numPtr = 20 // -> Assigning value to num
	fmt.Println(num) // -> Value of num
}
