// -> CreatedAt é time.Time{} (zero value)
// -> Você pode setar depois ou interpretar como "ainda não persistido"
// -> Nada quebra. Nenhum construtor é exigido.

package main

import (
	"fmt"
	"time"
)

type Audit struct {
	CreatedBy string
	UpdatedBy string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type User struct {
	Audit
	Name string
}

func main() {

	user := User{
		Name: "John Doe",
	}
	fmt.Printf(
		"%-10s %-10s %-25s %-25s %-20s\n",
		"CreatedBy", "UpdatedBy", "CreatedAt", "UpdatedAt", "Name",
	)
	fmt.Printf(
		"%-10s %-10s %-25s %-25s %-20s\n",
		user.Audit.CreatedBy,
		user.Audit.UpdatedBy,
		user.Audit.CreatedAt.Format(time.RFC3339),
		user.Audit.UpdatedAt.Format(time.RFC3339),
		user.Name,
	)

	user.Audit.CreatedAt = time.Now()
	fmt.Printf(
		"%-10s %-10s %-25s %-25s %-20s\n",
		user.Audit.CreatedBy,
		user.Audit.UpdatedBy,
		user.Audit.CreatedAt.Format(time.RFC3339),
		user.Audit.UpdatedAt.Format(time.RFC3339),
		user.Name,
	)

	user.Audit.UpdatedAt = time.Now()
	fmt.Printf(
		"%-10s %-10s %-25s %-25s %-20s\n",
		user.Audit.CreatedBy,
		user.Audit.UpdatedBy,
		user.Audit.CreatedAt.Format(time.RFC3339),
		user.Audit.UpdatedAt.Format(time.RFC3339),
		user.Name,
	)

	user.Audit.CreatedBy = "John Doe"
	fmt.Printf(
		"%-10s %-10s %-25s %-25s %-20s\n",
		user.Audit.CreatedBy,
		user.Audit.UpdatedBy,
		user.Audit.CreatedAt.Format(time.RFC3339),
		user.Audit.UpdatedAt.Format(time.RFC3339),
		user.Name,
	)

	user.Audit.UpdatedBy = "Jane Doe"
	fmt.Printf(
		"%-10s %-10s %-25s %-25s %-20s\n",
		user.Audit.CreatedBy,
		user.Audit.UpdatedBy,
		user.Audit.CreatedAt.Format(time.RFC3339),
		user.Audit.UpdatedAt.Format(time.RFC3339),
		user.Name,
	)
}
