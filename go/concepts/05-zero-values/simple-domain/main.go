// -> Status == "" (zero value)
// -> você pode interpretar "" como "não processado"

// Isso evita:
// -> enums obrigatórios
// -> inicialização artificial
// -> construtores só para setar default vazio

package main

import "fmt"

type Order struct {
	ID     string
	Status string
}

func main() {
	order := Order{ID: "123"}
	fmt.Println(order) // {123 }

	fmt.Println(order.Status)       // ""
	fmt.Println(order.Status == "") // true
	order.Status = "processed"
	fmt.Println(order.Status) // "processed"
}
