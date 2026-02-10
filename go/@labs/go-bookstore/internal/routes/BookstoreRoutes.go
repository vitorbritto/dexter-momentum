package routes

import (
	"github.com/gorilla/mux"
	"github.com/vitorbritto/go-bookstore/internal/usecases"
)

var ResgiterBookStoreRoutes = func(router *mux.Router) {
	router.HandleFunc("/books", usecases.GetBooks).Methods("GET")
	router.HandleFunc("/books/{bookId}", usecases.GetBookById).Methods("GET")
	router.HandleFunc("/books", usecases.CreateBook).Methods("POST")
	router.HandleFunc("/books/{bookId}", usecases.UpdateBook).Methods("PUT")
	router.HandleFunc("/books/{bookId}", usecases.DeleteBook).Methods("DELETE")
}
