package main

import (
	"errors"
	"fmt"
)

func doWork(success bool) error {
  fmt.Println("Doing work...")
  
  defer fmt.Println("Work finished")
  
  if !success {
    return errors.New("failed to do work")
  }

  fmt.Println("Working on something else...")
  fmt.Println("Something else done")

  return nil
}

func main() {
  fmt.Println("Case 1: Success")
  if err := doWork(true); err != nil {
    fmt.Println("Error:", err)
  }

  fmt.Println("Case 2: Failure")
  if err := doWork(false); err != nil {
    fmt.Println("Error:", err)
  }
}

// Output:

// Case 1: Success
// Doing work...
// Work done successfully
// Something else done

// Case 2: Failure
// Doing work...
// Work done successfully
// Something else done
// Error: failed to do work