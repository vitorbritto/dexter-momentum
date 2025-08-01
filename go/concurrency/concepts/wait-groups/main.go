package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	wg := sync.WaitGroup{}
	wg.Add(2)

	go func() {
		sendMessage("Hey!")
		defer wg.Done()
	}()

	go func() {
		sendMessage("Hello!")
		defer wg.Done()
	}()

	wg.Wait()
}

func sendMessage(msg string) {
	for i := 0; i < 5; i++ {
		fmt.Println(msg)
		time.Sleep(time.Second)
	}
}

