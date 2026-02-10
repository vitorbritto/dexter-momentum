package lead

import (
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/vitorbritto/go-fiber-crm-basic/database"
)

type Lead struct {
	gorm.Model
	Name    string
	Company string
	Email   string
	Phone   string
}

func GetLeads(c *fiber.Ctx) {
	db := database.DBConnection

	var leads []Lead

	db.Find(&leads)
	c.JSON(leads)
}

func GetLead(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConnection

	var lead Lead

	db.Find(&lead, id)
	c.JSON(lead)
}

func CreateLead(c *fiber.Ctx) {
	db := database.DBConnection

	lead := new(Lead)

	if err := c.BodyParser(lead); err != nil {
		c.Status(503).Send(err)
		return
	}

	db.Create(&lead)
	c.JSON(lead)
}

func UpdateLead() {

}

func DeleteLead() {

}
