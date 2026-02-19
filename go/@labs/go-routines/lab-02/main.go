package main

import "fmt"

// func main() {
//   ch := make(chan int)

//   go func() {
//     ch <- 42
//   }()

//   // select {}
// }

// ------------------------------------------------------------
// Goroutine bloqueada indefinidamente sem consumir CPU.
// ------------------------------------------------------------

// fatal error: all goroutines are asleep - deadlock!

// goroutine 1 [select (no cases)]:
// main.main()
// goroutine 4 [chan send]:
// main.main.func1()
// created by main.main in goroutine 1
// exit status 2

// func main() {
//   ch := make(chan int)

//   go func() {
//     ch <- 42
//   }()

//   select {}

//   // unreachable codeunreachabledefault
//   // fmt.Println(<-ch)
// }

func main() {
  ch := make(chan int)

  go func() {
    ch <- 42
  }()

  // select {}

  fmt.Println(<-ch)
}