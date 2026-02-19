package main

import (
	"fmt"
	"time"
)

func worker(name string) {
  for i := 0; i < 5; i++ {
    fmt.Println(name, i)
    time.Sleep(100 * time.Millisecond)
  }
}

func main() {
  go worker("A")
  go worker("B")
  go worker("C")

  time.Sleep(1 * time.Second)
}

// First attempt: C 0 | Second attempt: C 0
// First attempt: B 0 | Second attempt: A 0
// First attempt: A 0 | Second attempt: B 0
// First attempt: A 1 | Second attempt: B 1
// First attempt: B 1 | Second attempt: A 1
// First attempt: C 1 | Second attempt: C 1
// First attempt: C 2 | Second attempt: C 2
// First attempt: B 2 | Second attempt: A 2
// First attempt: A 2 | Second attempt: B 2
// First attempt: A 3 | Second attempt: B 3
// First attempt: C 3 | Second attempt: A 3
// First attempt: B 3 | Second attempt: C 3
// First attempt: B 4 | Second attempt: A 4
// First attempt: C 4 | Second attempt: C 4
// First attempt: A 4 | Second attempt: B 4