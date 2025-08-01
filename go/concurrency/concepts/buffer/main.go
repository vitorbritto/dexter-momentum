package main

import "fmt"

func main() {
	ch := make(chan string, 2) // Buffer with 2 messages
	ch <- "Message 1"
	ch <- "Message 2"

	msg := <-ch
	fmt.Println(msg)
}
