package main

import (
	"fmt"
	"sync"
	"time"
)

func run(jobs chan int, n int) {
  var wg sync.WaitGroup
  wg.Add(1)

  go func() {
    defer wg.Done()
    for v := range jobs {
      fmt.Println("Received", v)
      time.Sleep(200 * time.Millisecond)
    }
    fmt.Println("Jobs closed, nothing more to receive.")
  }()

  for i := 1; i <= n; i++ {
    fmt.Println("Sending", i)
    jobs <- i
    fmt.Println("Sent", i)
  }

  close(jobs)
  wg.Wait()
  fmt.Println("Main: Finishing...")
}

func main() {
  fmt.Println("Starting unbuffered channel...")
  run(make(chan int), 6)

  // fmt.Println("Starting buffered channel...")
  // run(make(chan int, 3), 6)
}