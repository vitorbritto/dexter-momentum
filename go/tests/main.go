package main

import (
	"fmt"

	"tests/location"
)

func main() {
	address := "Avenue Wall Street, New York, NY 10005"
	fmt.Println(location.AddressType(address))
}
