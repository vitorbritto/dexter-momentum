// IMPORTANT: nil is a predeclared identifier representing the zero value for a pointer, channel, func, interface, map, or slice type.

package main

import "fmt"

func boolean() {
	// Implicit declaration
	a := true

	// Explicit declaration
	var b bool = false

	fmt.Println(a)
	fmt.Println(b)
}

func number() {
	// int
	var a int = 10
	var b int8 = 20
	var c int16 = 30
	var d int32 = 40
	var e int64 = 50

	// uint
	var f uint = 10
	var g uint8 = 20
	var h uint16 = 30
	var i uint32 = 40
	var j uint64 = 50

	// float
	var k float32 = 10.5
	var l float64 = 20.5

	// complex
	var m complex64 = complex(10, 20)
	var n complex64 = complex(30, 40)

	// uintptr
	var o uintptr = 10
	var p uintptr = 20

	fmt.Println(a)
	fmt.Println(b)
	fmt.Println(c)
	fmt.Println(d)
	fmt.Println(e)
	fmt.Println(f)
	fmt.Println(g)
	fmt.Println(h)
	fmt.Println(i)
	fmt.Println(j)
	fmt.Println(k)
	fmt.Println(l)
	fmt.Println(m)
	fmt.Println(n)
	fmt.Println(o)
	fmt.Println(p)
}

func string() {
	// Implicit declaration
	implicitString := "Hello, World!"

	// Explicit declaration
	var explicitString = "Hello, World!"

	fmt.Println(implicitString)
	fmt.Println(explicitString)
}

func main() {
	boolean()
	number()
	string()
}
