package main

import "fmt"

func main() {
	tasks := make(chan int, 100)
	results := make(chan int, 100)

	go worker(tasks, results)
	go worker(tasks, results)

	for i := 0; i < 100; i++ {
		tasks <- i
	}

	close(tasks)

	for i := 0; i < 100; i++ {
		fmt.Println(<-results)
	}

	close(results)
}

func worker(tasks <-chan int, results chan<- int) {
	for n := range tasks {
		results <- fibonacci(n)
	}
}

func fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}
