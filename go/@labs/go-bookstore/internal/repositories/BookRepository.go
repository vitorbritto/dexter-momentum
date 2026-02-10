package repositories

import (
	"github.com/vitorbritto/go-bookstore/internal/config"
	"github.com/vitorbritto/go-bookstore/internal/models"
)

func GetAllBooks() []models.Book {
	var books []models.Book
	config.GetDB().Find(&books)
	return books
}

func GetBookById(id int64) (models.Book, error) {
	var book models.Book
	config.GetDB().First(&book, id)
	return book, nil
}

func CreateBook(book *models.Book) error {
	db := config.GetDB()
	if err := db.Create(book).Error; err != nil {
		return err
	}
	// PostgreSQL doesn't return LastInsertId; get ID from sequence (GORM Scan needs struct/slice)
	var result struct{ Id int64 }
	if err := db.Raw("SELECT LASTVAL() AS id").Scan(&result).Error; err != nil {
		return err
	}
	book.ID = uint(result.Id)
	return nil
}

func UpdateBook(book models.Book) error {
	config.GetDB().Save(&book)
	return nil
}

func DeleteBook(id int64) error {
	config.GetDB().Delete(&models.Book{}, id)
	return nil
}
