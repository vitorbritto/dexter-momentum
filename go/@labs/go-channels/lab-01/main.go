package main

import (
	"fmt"
	"time"
)

func main() {
  done := make(chan struct{})

  go func() {
    fmt.Println("Starting channel...")
    time.Sleep(2000 * time.Millisecond)
    fmt.Println("Closing channel...")
    done <- struct{}{} // Signal: "Ok, I'm done" -> Producer (send data to channel)
    }()
    
  <-done // Consumer (receives data from channel)

  fmt.Println("Waiting worker...")
  fmt.Println("Received, I'm gonna finish this.")
}