package main

import "fmt"

// Sem:
// -> init()
// -> NewMetrics()
// -> valores mágicos

// Zero value já representa estado inicial correto.

type Metrics struct {
	Requests int
	Errors   int
}

func main() {
	var metrics Metrics

	fmt.Println(metrics) // 0 0

	metrics.Requests++ // 1
	metrics.Errors++   // 1

	fmt.Println(metrics) // 1 1
}
