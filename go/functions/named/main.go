package main

import "fmt"

// Named function
func calculate2(n1 int, n2 int) (add int, sub int) {
	add = n1 + n2
	sub = n1 - n2
	return
}


func main() {
	add1, sub1 := calculate2(10, 5)
	fmt.Println(add1, sub1)

}
