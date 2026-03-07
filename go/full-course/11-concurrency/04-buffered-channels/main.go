package main

import (
	"fmt"
	"time"
)

// Unbuffered -> Handshake (send and receive)
// Buffered -> Capacity -> Buffer Size


func main() {
  jobs := make(chan string, 2) // Means that the channel can hold 2 messages.

  go func () {
    fmt.Println("Producer: Sending message 1")
    jobs <- "Message 1" // Goes into the buffer. 
    
    fmt.Println("Producer: Sending message 2")
    jobs <- "Message 2" // Goes into the buffer.
    
    fmt.Println("Producer: Sending message 3")
    jobs <- "Message 3" // -> Buffer is full. This will block the goroutine until a message is received. (Deadlock)

    close(jobs) // Closes the channel.
  }()

  for job := range jobs {
    fmt.Println("Consumer: Received message", job)
    time.Sleep(1 * time.Second) // Simulate processing...
    fmt.Println("Consumer: Processed message", job)
  }
}
