package main

import "fmt"

func main() {
	// Map is a collection of key-value pairs	

	// Create a map
	map1 := map[string]int{
		"one": 1,
		"two": 2,
		"three": 3,
	}
	fmt.Println(map1)

	// Access a value
	fmt.Println(map1["one"])

	// Add a key-value pair
	map1["four"] = 4
	fmt.Println(map1)

	// Delete a key-value pair
	delete(map1, "one")
	fmt.Println(map1)

	// Check if a key exists
	value, ok := map1["one"]
	fmt.Println(value, ok)

	// Length of a map
	fmt.Println(len(map1))

	// Map of maps
	map2 := map[string]map[string]int{
		"one": {"a": 1, "b": 2},
		"two": {"c": 3, "d": 4},
	}
	fmt.Println(map2)
}
