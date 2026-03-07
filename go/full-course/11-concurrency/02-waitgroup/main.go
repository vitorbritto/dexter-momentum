package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
  var wg sync.WaitGroup // WaitGroup is a control structure that allows waiting for multiple goroutines.
  // Add the number of goroutines to wait for. (3 because we are waiting for 3 goroutines)
  // WARNING: If the number of goroutines is not added, the program will panic. (Deadlock)
  wg.Add(3) 

  go func() {
    defer wg.Done()
    time.Sleep(300 * time.Millisecond)
    fmt.Println("Task 1")
  }()

  go func() {
    defer wg.Done()
    time.Sleep(2600 * time.Millisecond)
    fmt.Println("Task 2")
  }()

  go func() {
    defer wg.Done()
    time.Sleep(1200 * time.Millisecond)
    fmt.Println("Task 3")
  }()

  fmt.Println("Waiting for tasks to finish...") // This will be executed before the goroutines are started.

  wg.Wait() // Wait for all goroutines to finish.

  fmt.Println("All tasks finished") // This will be executed after the goroutines are finished.
}