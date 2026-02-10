package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/vitorbritto/go-bookstore/internal/routes"
)

func main() {
	router := mux.NewRouter()
	routes.ResgiterBookStoreRoutes(router)

	fmt.Println("Server is running on port 9010")
	log.Fatal(http.ListenAndServe("localhost:9010", router))

}
