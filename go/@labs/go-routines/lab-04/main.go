package main

import (
	"fmt"
	"time"
)

func addLetter(msg chan string) {
  for i := 0; i < 3; i++ {
    msg <- "Hello from the channel"
  }
  close(msg)
}

func main() {
  messages := make(chan string)

  go func() { messages <- "Ping" }()

  go addLetter(messages)

  time.Sleep(time.Second * 2)

  fmt.Println(<-messages)
}