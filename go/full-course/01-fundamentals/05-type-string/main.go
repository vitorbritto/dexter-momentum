package main

import (
	"fmt"
	"strings"
)

func main() {
  firstName := "Vitor"
  lastName := "Britto"
  fullName := firstName + " " + lastName

  fmt.Println("Name:", fullName)

  fmt.Println("Upper:", strings.ToUpper(fullName))
}