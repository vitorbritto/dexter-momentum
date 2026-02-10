package models

import (
	"time"

	"github.com/jinzhu/gorm"
	"github.com/vitorbritto/go-bookstore/internal/config"
)

var db *gorm.DB

type Book struct {
	ID          uint      `gorm:"primary_key" json:"id"`
	Name        string    `json:"name"`
	Author      string    `json:"author"`
	Publication string    `json:"publication"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	DeletedAt   *time.Time `json:"deletedAt,omitempty"`
}

func (b *Book) TableName() string {
	return "books"
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Book{})
}
