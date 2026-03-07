package main

import "fmt"

func main() {
  views := []int{10,20,30,60,70,90,85,45,15,20}
  total := 0

  for i, v := range views {
    fmt.Println("day", i, "views", v)
    total = total + v
  }

  fmt.Println("Total", total)
}