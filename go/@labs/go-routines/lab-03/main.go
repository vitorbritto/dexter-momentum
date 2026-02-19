package main

import (
	"fmt"
	"time"
)

func main() {
  for i := 0; i < 100000; i++ {
    go func() {
      time.Sleep(5 * time.Second)
    }()
  }

  fmt.Println("Criadas 100k goroutines")
  time.Sleep(10 * time.Second)
}