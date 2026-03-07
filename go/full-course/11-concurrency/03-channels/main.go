// Para I/O bound, o padrão é o mesmo: goroutines + channels (ou WaitGroup)
// para disparar várias operações de I/O em paralelo e só então agregar os resultados.
// O “processo” que “ocorre” é a espera pela resposta (rede/disco/DB), e essa espera
// é que acontece em paralelo.

// Exemplo mental (3 requests HTTP)
// Sequencial: 200ms + 150ms + 100ms = 450ms.
// Concorrente: as 3 requisições disparam juntas; você espera a mais lenta, por exemplo ~200ms.
// O ganho é o mesmo tipo do exemplo com time.Sleep: não somamos os tempos, porque as esperas são paralelas.

package main

import (
	"fmt"
	"sync"
	"time"
)

type User struct {
  Name string
  Email string
  Age int
}

func createUser(ch chan User) {
  time.Sleep(3 * time.Second)
  ch <- User{Name: "John", Email: "john@example.com", Age: 30}
  fmt.Println("User created and sent to channel")
}

func getUser(ch chan User) {
  time.Sleep(5 * time.Second)
  user := <- ch
  fmt.Println(user)
  fmt.Println("User received")
}

func main() {
  // While WaitGroups helps to synchronize multiple goroutines to finish,
  // Channels helps to send and receive values between goroutines.

  // run work concurrently + collect results
  // pipe -> send values between goroutines
  // Go routine #1 -> send values to channel (Producer) | channel <- value (ch <- "Hello")
  // Go routine #2 -> receive values from channel (Consumer) | value <- channel (msg := <- ch)

  fmt.Println("Starting channels... ", time.Now())

  ch := make(chan User)
  wg := sync.WaitGroup{} // WaitGroup is a control structure that allows waiting for multiple goroutines.
  wg.Add(2) // Add the number of goroutines to wait for. (2 because we are waiting for 2 goroutines)
  // WARNING: If the number of goroutines is not added, the program will panic. (Deadlock)

  go func() {
    defer wg.Done() // Done() is used to signal that the goroutine has finished.
    createUser(ch)
  }()

  go func() {
    defer wg.Done() // Done() is used to signal that the goroutine has finished.
    getUser(ch)
  }()
  
  wg.Wait() // Wait for all goroutines to finish.
  close(ch) // Close the channel to signal that no more values will be sent.
  // -> Warning: If the channel is not closed, the program will hang indefinitely.

  fmt.Println("Main: Finished", time.Now())
}