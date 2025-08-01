package main

import (
	"fmt"
	"time"
)

func main() {
	go sayHello("Sending message from Batch 01")
	go sayHello("Sending message from Batch 02")
	sayHello("Sending message from Batch 03")
}

func sayHello(msg string) {
	for {
		fmt.Println(msg)
		time.Sleep(time.Second)
	}
}
