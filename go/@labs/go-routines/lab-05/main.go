package main

import (
	"fmt"
	"time"
)

func main() {
  for i := 1; i <= 10; i++ {
    n := i

    go func() {
      fmt.Println(n)
    }()
  }

  time.Sleep(200 * time.Millisecond)
}