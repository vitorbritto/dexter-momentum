package main

import (
	"encoding/json"
	"fmt"
	"time"
)

type Audit struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	CreatedBy string
	UpdatedBy string
}

type User struct {
	ID       string
	Name     string
	Email    string
	Phone    string
	Document string
}

type Address struct {
	Street  string
	City    string
	State   string
	Zip     string
	Country string
}

type Employee struct {
	User
	HiredAt     time.Time
	Company     string
	NetSalary   float64
	GrossSalary float64
	Address
	Audit
}

type Customer struct {
	User
	CreditLimit    float64
	TotalPurchases float64
	Address
	Audit
}

func main() {
	employee := Employee{
		User: User{
			ID:       "1",
			Name:     "John Doe",
			Email:    "john.doe@example.com",
			Phone:    "1234567890",
			Document: "1234567890",
		},
		HiredAt:     time.Now(),
		Company:     "Acme Inc.",
		NetSalary:   1000.00,
		GrossSalary: 1200.00,
		Address: Address{
			Street:  "123 Main St",
			City:    "Anytown",
			State:   "CA",
			Zip:     "12345",
			Country: "USA",
		},
		Audit: Audit{
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
			CreatedBy: "John Doe",
			UpdatedBy: "John Doe",
		},
	}

	customer := Customer{
		User: User{
			ID:       "2",
			Name:     "Jane Doe",
			Email:    "jane.doe@example.com",
			Phone:    "1234567890",
			Document: "1234567890",
		},
		CreditLimit:    1000.00,
		TotalPurchases: 1000.00,
		Address: Address{
			Street:  "123 Main St",
			City:    "Anytown",
			State:   "CA",
			Zip:     "12345",
			Country: "USA",
		},
		Audit: Audit{
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
			CreatedBy: "Jane Doe",
			UpdatedBy: "Jane Doe",
		},
	}

	employeeJSON, err := json.MarshalIndent(employee, "", "  ")
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println()
	fmt.Println("----------------------------------------------------------------")
	fmt.Println("Employee:", string(employeeJSON))
	fmt.Println("----------------------------------------------------------------")
	fmt.Println()

	customerJSON, err := json.MarshalIndent(customer, "", "  ")
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println()
	fmt.Println("----------------------------------------------------------------")
	fmt.Println("Customer:", string(customerJSON))
	fmt.Println("----------------------------------------------------------------")
	fmt.Println()
}
