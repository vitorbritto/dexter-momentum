package main

import (
	"context"
	"fmt"
	"time"
)

func slowAPI(ctx context.Context, id int) string {
  select {
  case <-ctx.Done():
    return fmt.Sprintf("context cancelled for id %d", id)
  default:
    time.Sleep(600 * time.Millisecond)
    return fmt.Sprintf("ok-%d", id)
  }
}

func main() {
  ctx, cancel := context.WithTimeout(context.Background(), 500 * time.Millisecond)
  defer cancel()

  results := make(chan string)

  for i := 1; i <= 5; i++ {
    go func(id int) {
      results <- slowAPI(ctx, id)
    }(i)
  }

  for i := 1; i <= 5; i++ {
    fmt.Println(<-results)
  }
}