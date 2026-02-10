package main

import (
	"fmt"

	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	"github.com/vitorbritto/go-fiber-crm-basic/database"
	"github.com/vitorbritto/go-fiber-crm-basic/lead"
)

func setupRoutes(app *fiber.App) {
	app.Get("/api/v1/leads", lead.GetLeads)
	app.Get("/api/v1/leads/:id", lead.GetLead)
	app.Post("/api/v1/leads", lead.CreateLead)
	app.Put("/api/v1/leads/:id", lead.UpdateLead)
	app.Delete("/api/v1/leads/:id", lead.DeleteLead)
}

func initDatabase() {
	var err error

	database.DBConnection, err = gorm.Open("sqlite3", "leads.db")

	if err != nil {
		panic("Failed to connect database")
	}

	fmt.Println("Connection opened to database")

	database.DBConnection.AutoMigrate(&lead.Lead{})

	fmt.Println("Database migrated!")
}

func main() {
	app := fiber.New()
	initDatabase()
	setupRoutes(app)
	app.Listen(3000)
	defer database.DBConnection.Close()

}
