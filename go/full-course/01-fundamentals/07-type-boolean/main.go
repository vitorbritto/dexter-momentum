package main

import (
	"fmt"
)

func main() {
  isLogged := true
  isAdmin := false
  hasSubscription := true

  canOpenDashboard := isLogged && hasSubscription
  canDeletePost := isAdmin || (isLogged && hasSubscription)

  fmt.Println(canOpenDashboard, canDeletePost)
}
