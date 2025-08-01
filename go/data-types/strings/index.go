package strings

import "fmt"

func Execute() {
	// Implicit declaration
	a := "Hello, World!"

	// Explicit declaration
	var b string = "Hello, World!"

	fmt.Println(a)
	fmt.Println(b)
}
