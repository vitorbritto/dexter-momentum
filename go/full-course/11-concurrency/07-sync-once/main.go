package main

import (
	"fmt"
	"sync"
	"time"
)

// Simulate an expensive initialization process, e.g., connecting to a database.
func initialize() {
	fmt.Println("Initializing resource (should run only once)...")
	time.Sleep(3 * time.Second) // Simulate a long initialization process.
	fmt.Println("Initialization done.")
}

// Worker is a function that will be executed by a goroutine.
func worker(id int, once *sync.Once, wg *sync.WaitGroup) {
	defer wg.Done() // Done() is used to signal that the goroutine has finished.
	once.Do(initialize) // Do() is used to execute the function only once.
	fmt.Printf("Worker %d is running, using the initialized resource.\n", id)
}

func main() {
	var once sync.Once // Once is a control structure that allows executing a function only once.
	var wg sync.WaitGroup // WaitGroup is a control structure that allows waiting for multiple goroutines.

	numWorkers := 10 // Number of workers to create.
	wg.Add(numWorkers) // Add the number of goroutines to wait for. (5 because we are waiting for 5 goroutines)
	// WARNING: If the number of goroutines is not added, the program will panic. (Deadlock)

	for i := 1; i <= numWorkers; i++ { // Create 5 workers.
		go worker(i, &once, &wg)
	}

	wg.Wait() // Wait for all goroutines to finish.
	fmt.Println("All workers finished.")
}