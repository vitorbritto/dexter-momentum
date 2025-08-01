package main

import "fmt"

func init() {
	fmt.Println("Init function")
}

func main() {
	fmt.Println("Main function")
}

// Init function is executed before the main function.
// It is used to initialize variables or perform other setup tasks.
// It is executed only once when the program starts.
// It is executed in the order of the files in the package.
// It is executed in the order of the files in the package.