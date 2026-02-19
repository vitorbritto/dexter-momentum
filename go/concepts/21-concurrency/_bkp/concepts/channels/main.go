package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan string)
	go sendMessage(ch, "Message sent!")
	fmt.Println("Waiting for message...")
	receiveMessage(ch)
}

func sendMessage(ch chan string, msg string) {
	time.Sleep(time.Second * 5)
	ch <- msg
}

func receiveMessage(ch chan string) {
	msg := <-ch
	fmt.Println(msg)
	fmt.Println("Message received!")

	close(ch)
}
