package main

import (
	// "bytes"
	"encoding/json"
	"fmt"
)

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func main() {
	user := User{ID: 1, Name: "John Doe", Email: "john.doe@example.com", Password: "password"}
	json, err := toJSON(user)
	if err != nil {
		fmt.Println("Error:", err)
	}
	fmt.Println(json)
	// buffer := bytes.NewBuffer(json)
	// fmt.Println(buffer)

	source := `{"id":1,"name":"John Doe","email":"john.doe@example.com","password":"password"}`
	user2 := User{}
	err = fromJSON(source, &user2)
	if err != nil {
		fmt.Println("Error:", err)
	}
	fmt.Println(user2)


}

func toJSON(v any) (string, error) {
	json, err := json.Marshal(v)
	if err != nil {
		return "", err
	}
	return string(json), nil
}

func fromJSON(s string, v any) error {
	source := []byte(s)
	err := json.Unmarshal(source, v)	
	if err != nil {
		return err
	}
	return nil
}
