package main

import (
	"fmt"
	"reflect"
)

func main() {
  ages := map[string]int {
    "John" : 45,
    "Jade" : 40,
    "Joshua" : 10,
    "Jane" : 5,
  }

  fmt.Println(ages["John"], len(ages))
  fmt.Println(ages["John"] + ages["Jade"])
  fmt.Println(ages)

  // Dynamic Map with make()
  scores := make(map[string]int)
  scores["John"] = 100
  scores["Jade"] = 90
  scores["Joshua"] = 80
  scores["Jane"] = 70
  fmt.Println(scores)

  // Length of scores
  fmt.Println("Length of scores: ", len(scores))

  // Type of scores
  fmt.Println("Type of scores: ", reflect.TypeOf(scores))

  // Access a value
  fmt.Println("Score of John: ", scores["John"])

  // Update a value
  scores["John"] = 100
  fmt.Println("Scores: ", scores)

  // Delete a value
  delete(scores, "John")
  fmt.Println("Scores: ", scores)

  // Length of scores
  fmt.Println("Length of scores: ", len(scores)) // Length of scores:  3
}