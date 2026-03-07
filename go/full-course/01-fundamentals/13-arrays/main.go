package main

import (
	"fmt"
	"reflect"
)

func main() {
  // Fixed Size
  var marks [3]int

  marks[0] = 10
  marks[1] = 20
  marks[2] = 50
  // marks[3] = 80 // invalid argument: index 3 out of bounds [0:3]

  fmt.Println("Marks: ", marks)
 
  // Literal Arrays
  // res := [5]int{1,2,3,4,5,6} // index 5 is out of bounds (>= 5)
  res := [5]int{1,2,3,4,5}

  fmt.Println("Res: ", res)

  // Length
  fmt.Println("Length of res: ", len(res))

  // Type
  fmt.Println("Type of res: ", reflect.TypeOf(res))
}