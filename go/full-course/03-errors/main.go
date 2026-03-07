package main

import (
	"errors"
	"fmt"
)

func run() error{
  level, err := parseLevel("error")
  if err != nil {
    return err
  }
  fmt.Println(level)
  return nil
}

func parseLevel(level string) (int, error) {
  // [value, error]
  // nil error -> no error | success
  // non-nil -> error | failure
  switch level {
  case "info":
    return 1, nil
  case "warning":
    return 2, nil
  case "error":
    return 3, nil
  }
  return 0, errors.New("invalid level")
}

func main() {
  // Go don't have exceptions.
  // Go returns errors as values.

  // Example:
  // val, err := function()
  // if err != nil {
  //   // handle error
  // }
  
  if err := run(); err != nil {
    fmt.Println("Error:", err)
  } else {
    fmt.Println("No error")
  }
}