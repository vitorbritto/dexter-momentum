package main

import (
	"fmt"
	"time"
)

func main() {
	ch1, ch2 := make(chan string), make(chan string)

	go func() {
		for {
			time.Sleep(time.Millisecond * 500)
			ch1 <- "Message 1"
		}
	}()

	go func() {
		for {
			time.Sleep(time.Second * 2)
			ch2 <- "Message 2"
		}
	}()

	for {
		select {
		case msgCh1 := <-ch1:
			fmt.Println(msgCh1)
		case msgCh2 := <-ch2:
			fmt.Println(msgCh2)
		}
	}
}

