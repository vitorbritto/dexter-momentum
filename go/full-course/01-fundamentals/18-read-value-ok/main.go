package main

import (
	"fmt"
)

func main() {
	scores := map[string]int{
		"John": 100,
		"Jade": 90,
		"Joshua": 80,
		"Jane": 70,
	}

	fmt.Println(scores)

  delete(scores, "John")
  
  value, ok := scores["John"]

  if ok {
    fmt.Println("Score of John: ", value)
  } else {
    fmt.Println("Score of John not found")
  }
}