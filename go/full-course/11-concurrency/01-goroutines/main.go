package main

import (
	"fmt"
	"time"
)

func main() {
  // ------------------------------------------------------------
  // Goroutines
  // ------------------------------------------------------------

  // - Goroutines: Do multiple tasks at the same time.
  // - Overlapping: execution of tasks without waiting for each other to finish.
  // - Concurrency: The ability of a program to execute multiple tasks at the same time on a single processor. Tasks take turns executing.
  // - Parallelism: The ability of a program to execute multiple tasks at the same time on different processors.

  // I/O-bound: I/O operations are the operations that are waiting for the input/output of the program.
  // CPU-bound: CPU-bound operations are the operations that are waiting for the CPU to finish the operation.

  // I/O-bound tasks:
  // - Reading from a file.
  // - Writing to a file.
  // - Making a network request.
  // - Waiting for a user input.
  // - Waiting for a network response.
  // - Waiting for a database query.
  // - Waiting for a slow API call.
  // - Waiting for a slow database query.

  // CPU-bound tasks:
  // - Calculating a large number.
  // - Sorting a large number.
  // - Calculating a large matrix.
  // - Calculating a large vector.

  // Create a new goroutine
  go func() {
    // Go Code will not wait for the goroutine to finish.
    // It will continue executing the main function.
    fmt.Println("Go Routine: Simulating a long operation...")
    time.Sleep(300 * time.Millisecond)
    fmt.Println("Go Routine: Operation finished")
  }()

  // Go Code will wait for the goroutine to finish.
  // It will continue executing the main function after the goroutine finishes.
  time.Sleep(600 * time.Millisecond)
  fmt.Println("Main: Finished")
}