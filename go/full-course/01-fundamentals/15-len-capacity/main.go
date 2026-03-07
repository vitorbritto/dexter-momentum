package lencapacity

import (
	"fmt"
	"reflect"
)

func main() {
  results := []string{"Win", "Lose", "Win", "Win", "Lose"}

  fmt.Println("Results: ", results)

  // Length
  fmt.Println("Length of results: ", len(results)) // 5

  // Capacity
  fmt.Println("Capacity of results: ", cap(results)) // 5

  // Type
  fmt.Println("Type of results: ", reflect.TypeOf(results))

  // Access a value
  fmt.Println("Result at index 0: ", results[0]) // Win

  // Update a value
  results[0] = "Draw"
  fmt.Println("Results: ", results) // [Draw Lose Win Win Lose]

  // Append a value
  results = append(results, "Win")
  fmt.Println("Results: ", results) // [Draw Lose Win Win Lose Win]

  // Append multiple values
  results = append(results, "Win", "Lose", "Win")
  fmt.Println("Results: ", results) // [Draw Lose Win Win Lose Win Win Win Lose Win]

  // Append a slice to a slice
  results = append(results, results...)
  fmt.Println("Results: ", results) // [Draw Lose Win Win Lose Win Win Win Lose Win Win Win Lose Win]

  // Copy a slice
  results2 := make([]string, len(results)) // [0 0 0 0 0 0 0 0 0 0]
  copy(results2, results) // [Draw Lose Win Win Lose Win Win Win Lose Win Win Win Lose Win]
  fmt.Println("Results2: ", results2)

  // Length of results2
  fmt.Println("Length of results2: ", len(results2)) // 10

  // Capacity of results2
  fmt.Println("Capacity of results2: ", cap(results2)) // 10
}