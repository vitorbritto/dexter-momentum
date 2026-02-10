// 1. Struct de configuração (sem construtor)
// Exemplo real: Configuração de serviço
// Aqui:
// 	•	Port começa em 0
// 	•	Debug começa em false

// Não é necessário um NewConfig().
// O struct vazio já é seguro e previsível.

// 👉 Em muitas linguagens, você precisaria inicializar tudo para evitar null.

package main

import "fmt"

type Config struct {
	Port  int
	Debug bool
}

func main() {
	var cfg Config

	// fmt.Println("Starting server on port", cfg.Port)
	// fmt.Println("Debug mode:", cfg.Debug)

	cfg.Port = 8080
	cfg.Debug = true

	fmt.Println("Starting server on port", cfg.Port)
	fmt.Println("Debug mode:", cfg.Debug)

}
