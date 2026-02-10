package usecases

import (
	"encoding/json"
	"net/http"

	"github.com/vitorbritto/go-bookstore/internal/models"
	"github.com/vitorbritto/go-bookstore/internal/repositories"
	"github.com/vitorbritto/go-bookstore/internal/utils"
)

func CreateBook(w http.ResponseWriter, r *http.Request) {
	book := models.Book{}
	utils.ParseBody(r, &book)
	err := repositories.CreateBook(&book)
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}
	json.NewEncoder(w).Encode(book)
}
