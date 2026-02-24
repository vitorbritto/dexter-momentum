package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
  const N = 5
  jobs := make (chan int)

  var wg sync.WaitGroup
  wg.Add(1)

  // Consumer
  go func(){
    defer wg.Done()

    for v := range jobs {
      fmt.Println("Consumer: Received", v)
      time.Sleep(150 * time.Millisecond) // Simulate proccess...
    }

    fmt.Println("Consumer: jobs closed, nothing more to consume.")
  }()

  // Producer
  for i := 1; i <= N; i++ {
    fmt.Println("Producer: Sending...", i)
    jobs <- i
  }

  close(jobs) // Signal: nothing more to come into...
  fmt.Println("Producer: closed jobs")

  wg.Wait()
  fmt.Println("Main: Finishing...")


}