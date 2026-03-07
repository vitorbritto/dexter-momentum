// Use pointers to:
// - Modify the original value
// - Pass a large value to a function
// - Return multiple values from a function
// - Pass a value by reference

package main

import "fmt"

func main() {
  // Pointer is a variable that stores the memory address of another variable.
  // Pointer is a reference to a memory address

  // *int -> Pointer to an integer
  // & -> Address of
  // * -> Value of

  // Example:
  // var x int = 10
  // var y *int = &x
  // fmt.Println(y)

  x := 10
  y := &x
  fmt.Println(&y) // 0x1400010e028 -> address of the pointer
  fmt.Println(*y) // 10 -> dereferencing the pointer

  modifyValue(&x)
  fmt.Println(x) // 20
}

func modifyValue(x *int) {
  *x = *x * 2
}