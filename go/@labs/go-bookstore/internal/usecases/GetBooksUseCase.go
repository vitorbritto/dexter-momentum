package usecases

import (
	"encoding/json"
	"net/http"

	"github.com/vitorbritto/go-bookstore/internal/repositories"
)

func GetBooks(w http.ResponseWriter, r *http.Request) {
	books := repositories.GetAllBooks()
	json.NewEncoder(w).Encode(books)
}
