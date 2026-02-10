// Aqui:
// -> o struct é válido
// -> apenas o campo interno precisa inicialização

// 👉 Zero value do struct ainda é seguro; você só inicializa o que precisa.

package main

import "fmt"

type Cache struct {
	items map[string]string
}

func main() {
	var c Cache

	if c.items == nil {
		c.items = make(map[string]string)
	}

	c.items["key"] = "value"

	fmt.Println(c.items)
}
