package main

import (
	"fmt"
)

// $ go mod init github.com/owner/repository
func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}
