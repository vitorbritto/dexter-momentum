package main

import "fmt"

func main() {
  var channel string;
  channel = "VitorBritto"

  var year int = 2026

  var rating1 float32 = 4.8989806 // 8 digits, without dot
  var rating2 float64 = 4.898980800808089 // 16 digits, without dot
  
  fmt.Println("Channel:", channel)
  fmt.Println("Year:", year)
  fmt.Println("Rating:", rating1)
  fmt.Println("Rating:", rating2)
}