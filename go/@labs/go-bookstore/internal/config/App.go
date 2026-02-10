package config

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var (
	db *gorm.DB
)

func Connect() {
	dsn := "host=localhost user=postgres password=postgres dbname=bookstore port=5432 sslmode=disable TimeZone=America/Sao_Paulo"
	var err error
	db, err = gorm.Open("postgres", dsn)
	if err != nil {
		panic(err)
	}
}

func GetDB() *gorm.DB {
	return db
}
