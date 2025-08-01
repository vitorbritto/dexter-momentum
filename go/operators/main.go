package main

import "fmt"

// Arithmetic Operators
// Assignment Operators
// Comparison Operators
// Logical Operators
// Bitwise Operators
// Unary Operators

func main() {
	// Arithmetic Operators
	fmt.Println(1 + 1)
	fmt.Println(1 - 1)
	fmt.Println(1 * 1)
	fmt.Println(1 / 1)

	// Assignment Operators
	var a int = 1
	b := 1
	fmt.Println(a, b)

	// Comparison Operators
	fmt.Println(1 == 1)
	fmt.Println(1 != 1)
	fmt.Println(1 > 1)
	fmt.Println(1 < 1)
	fmt.Println(1 >= 1)
	fmt.Println(1 <= 1)

	// Logical Operators
	fmt.Println(true && true)
	fmt.Println(true || false)
	fmt.Println(!true)

	// Bitwise Operators
	fmt.Println(1 & 1)
	fmt.Println(1 | 1)
	fmt.Println(1 ^ 1)
	fmt.Println(1 << 1)
	fmt.Println(1 >> 1)

	// Unary Operators
	a++
	b--
	fmt.Println(a)
	fmt.Println(b)

	num1, num2, num3, num4, num5 := 10, 10, 10, 10, 10

	num1 += 1
	num2 -= 1
	num1 *= 1
	num2 /= 1
	num1 %= 1
	
	fmt.Println(num1, num2, num3, num4, num5)
}
