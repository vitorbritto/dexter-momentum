package numbers

import "fmt"

func Execute() {
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

	// uint
	var o uint = 10
	var p uint = 20

	// uintptr
	var q uintptr = 10
	var r uintptr = 20

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
	fmt.Println(q)
	fmt.Println(r)
}
