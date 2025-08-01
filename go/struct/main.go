package main

import "fmt"

type User struct {
	name string
	age  int
}

type Student struct {
	User
	school string
}

// Anonymous struct
type Person struct {
	name string
	age  int
}

type Employee struct {
	Person
	company string
}

// Structs are used to create objects


func main() {
	user := User{name: "John", age: 20}
	fmt.Println(user)

	employee := Employee{Person: Person{name: "Jane", age: 21}, company: "Google"}
	fmt.Println(employee)

	student := Student{User: User{name: "Doe", age: 22}, school: "Harvard"}
	fmt.Println(student)

	person := Person{name: "John", age: 20}
	fmt.Println(person)

	employee2 := Employee{Person: person, company: "Google"}
	fmt.Println(employee2)

	employee3 := Employee{Person: Person{name: "Jane", age: 21}, company: "Apple"}
	fmt.Println(employee3)
}
