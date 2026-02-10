package errors

import (
	"errors"
	"fmt"
)

func Execute() {
	error := errors.New("error")
	fmt.Println(error)
}
