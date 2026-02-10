package main

import (
	"fmt"
	"reflect"
)

// - Array is a collection of elements of the same type
// - Slice is a dynamic array
// - Slice is a reference to an array
// - Slice always has a length and a capacity
// - Slice set new capacity when appending more than the current capacity

func main() {
	arr1 := [5]int{1, 2, 3, 4, 5}
	fmt.Println(arr1)

	arr2 := [...]int{1, 2, 3, 4, 5} // Not recommended
	fmt.Println(arr2)

	slice := []int{1, 2, 3, 4, 5}
	fmt.Println(slice)

	fmt.Println(reflect.TypeOf(slice))
	fmt.Println(reflect.TypeOf(arr1))

	// Create a Slice from Array
	sliceFromArray := arr1[1:3]
	fmt.Println(sliceFromArray)

	// Append
	slice = append(slice, 6)
	fmt.Println(slice)

	// Append multiple
	slice = append(slice, 7, 8, 9)
	fmt.Println(slice)

	// Copy
	slice2 := make([]int, len(slice))
	copy(slice2, slice)
	fmt.Println(slice2)	

	// Length
	fmt.Println(len(slice))

	// Capacity
	fmt.Println(cap(slice))
}
