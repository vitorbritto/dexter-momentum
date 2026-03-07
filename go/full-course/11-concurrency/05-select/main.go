package main

import (
	"fmt"
	"math/rand"
	"time"
)

// SimulatedRequest simulates an external API request, database query, or similar I/O operation.
func SimulatedRequest(name string, minMs, maxMs int, ch chan<- string) {
	for {
		// Simulate variable network/API request latency
		delay := time.Duration(rand.Intn(maxMs-minMs)+minMs) * time.Millisecond
		time.Sleep(delay)
		ch <- fmt.Sprintf("%s response after %v", name, delay)
	}
}

func main() {
	rand.New(rand.NewSource(time.Now().UnixNano()))

	apiChan := make(chan string)
	dbChan := make(chan string)

	// Simulate an external API with occasional responses (e.g., every 400-900ms)
	go SimulatedRequest("External API", 400, 900, apiChan)
	// Simulate a slower database operation (e.g., every 1500-2500ms)
	go SimulatedRequest("Database Query", 1500, 2500, dbChan)

	fmt.Println("Waiting for data from either the External API or the Database... (press Ctrl+C to stop)")

	for {
		select {
		case apiMsg := <-apiChan:
			fmt.Println("Received from API:", apiMsg)
		case dbMsg := <-dbChan:
			fmt.Println("Received from Database:", dbMsg)
		}
	}
}