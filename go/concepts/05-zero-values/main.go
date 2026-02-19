package main

import (
	"fmt"
)

func main() {
	var n int
	fmt.Println(n) // 0

	var s string
	fmt.Println(s) // ""

	var b bool
	fmt.Println(b) // false

	var f float64
	fmt.Println(f) // 0.0

	var nums []int
	fmt.Println(nums)
	fmt.Println(nums == nil) // true

	var settings map[string]string
	fmt.Println(settings)
	fmt.Println(settings == nil) // true

	var ptr *int
	fmt.Println(ptr)
	fmt.Println(ptr == nil) // true
}
