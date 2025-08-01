package main

import "runtime/debug"

func f3() {
	debug.PrintStack()
}

func f2() {
	f3()
}

func f1() {
	f2()
}

func main() {
	f1()
}

// Output:
// goroutine 1 [running]:
// main.f3()
// 	/Users/jason/go/src/stack-function/main.go:3 +0x11
// main.f2()
// 	/Users/jason/go/src/stack-function/main.go:7 +0x11
// main.f1()
// 	/Users/jason/go/src/stack-function/main.go:11 +0x11
// main.main()
// 	/Users/jason/go/src/stack-function/main.go:15 +0x11
