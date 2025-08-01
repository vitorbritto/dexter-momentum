package main

import "fmt"

func main() {
	// Explicit declaration
	var a int = 10
	var b int = 20
	var c int = a + b
	var d string = "Hello, World!"
	var e bool = true

	// Implicit declaration
	f := 10
	g := 10
	h := "Hello, World!"
	i := true
	j := 1.23

	// Multiple declarations
	k, l := 10, "Hello, World!"
	m, n := 1.23, true

	var (
		o int = 10
		p int = 20
		q int = o + p
		r string = "Hello, World!"
		s bool = true
	)

	// Output
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
	fmt.Println(s)
}
