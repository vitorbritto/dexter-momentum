package main

import (
	"fmt"
	"time"
)

func main() {
	// Create input channels
	input1 := make(chan string)
	input2 := make(chan string)
	input3 := make(chan string)
	input4 := make(chan string)
	input5 := make(chan string)
	
	// Create multiplexed output channel
	output := multiplex(input1, input2, input3, input4, input5)

	// Start producers
	go producer(input1, "Producer 1")
	go producer(input2, "Producer 2")
	go producer(input3, "Producer 3")
	go producer(input4, "Producer 4")
	go producer(input5, "Producer 5")

	// Consume messages
	go consumer(output)

	// Wait for a while to see the results
	time.Sleep(time.Second)

	// Clean up
	close(input1)
	close(input2)
}

// multiplex combines messages from multiple input channels into a single output channel
func multiplex(inputs ...<-chan string) <-chan string {
	output := make(chan string)
	
	for _, ch := range inputs {
		go func(c <-chan string) {
			for msg := range c {
				output <- msg
			}
		}(ch)
	}

	return output
}

func producer(output chan<- string, name string) {
	for i := 0; i <= 10; i++ {
		output <- fmt.Sprintf("%s: Message %d", name, i)
		time.Sleep(100 * time.Millisecond)
	}
}

func consumer(input <-chan string) {
	for message := range input {
		fmt.Println(message)
	}
}
