package main

import (
	"fmt"
	"time"
)

func slowAPI(id int) string {
  time.Sleep(300 * time.Millisecond)
  return fmt.Sprintf("ok-%d", id)
}

func main() {
  const N = 5

  // Sequential
  startSequential := time.Now()
  for i := 1; i <= N; i++ {
    _ = slowAPI(i)
  }
  fmt.Println("Sequential:", time.Since(startSequential))

  // Concurrency
  startConcurrency := time.Now()
  results := make(chan string)

  for i := 1; i <= N; i++ {
    id := 1
    go func (){
      results <- slowAPI(id)
    }()
  }

  for i := 1; i <= N; i++ {
    <-results
  }

  fmt.Println("Concurrency:", time.Since(startConcurrency))
}

