package usecases

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/vitorbritto/go-bookstore/internal/repositories"
	"github.com/vitorbritto/go-bookstore/internal/utils"
)

func UpdateBook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	bookId, err := strconv.ParseUint(vars["bookId"], 10, 64)
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}
	book, err := repositories.GetBookById(int64(bookId))
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}
	utils.ParseBody(r, &book)
	repositories.UpdateBook(book)
	json.NewEncoder(w).Encode(book)
}
