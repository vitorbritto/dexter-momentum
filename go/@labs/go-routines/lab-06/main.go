package main

import (
	"fmt"
	"sync"
)

func main() {
  var wg sync.WaitGroup

  for i := 1; i <= 10; i++ {
    n := i
    wg.Add(1)

    go func() {
      defer wg.Done()
      fmt.Println(n)
    }()
  }

  wg.Wait()
}