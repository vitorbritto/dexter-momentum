package usecases

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/vitorbritto/go-bookstore/internal/repositories"
)

func DeleteBook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	bookId, err := strconv.ParseInt(vars["bookId"], 10, 64)
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}
	err = repositories.DeleteBook(bookId)
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}
	json.NewEncoder(w).Encode("Book deleted successfully")
}
