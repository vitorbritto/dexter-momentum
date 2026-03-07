package main

import "fmt"

func add(a int, b int) int {
  return a + b
}

func sumAndProduct(a int , b int) (int, int) {
  sum := a + b
  product := a * b

  return sum, product
}

func main() {
  sum := add(5,5)
  fmt.Println("Sum:", sum)

  s, p := sumAndProduct(6,5)

  fmt.Println("Sum:", s)
  fmt.Println("Product:", p)

  onlySum, _ := sumAndProduct(10,2)
  fmt.Println("Sum:", onlySum)
}