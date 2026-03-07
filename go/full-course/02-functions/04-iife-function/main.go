package main

import "fmt"


func main() {
	sum := (func() int {
		return 1 + 2 + 3 + 4 + 5 + 10 + 15 + 20 + 25 + 30 + 35 + 40 + 45 + 50
	})()
	fmt.Println(sum)
}