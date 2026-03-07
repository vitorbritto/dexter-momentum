package utils

import (
	"fmt"
	"modules/internal/types"
)

func Notify(user types.User) string {
	message := fmt.Sprintf("Sending email to %s <%s>", user.Name, user.Email)
	return message
}