package main

import "fmt"

func main() {
  // Longest way..
  var city string;
  city = "London"

  // Declare and assignee
  var channel string = "General"

  // Short way (declared and inferred)
  username := "Vitor Britto"

  // Multiples in one line
  likes, comments := 100, 30

  fmt.Println("City:", city)
  fmt.Println("Channel:", channel)
  fmt.Println("Username:", username)
  fmt.Println("Likes:", likes)
  fmt.Println("Comments:", comments)

  // Output:
  // City: London
  // Channel: General
  // Username: Vitor Britto
  // Likes: 100
  // Comments: 30

}