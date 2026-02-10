package main

import "fmt"

// Switch with expression
func dayOfWeek(day int) string {
	switch day {
	case 1:
		return "Monday"
	case 2:
		return "Tuesday"
	case 3:
		return "Wednesday"
	case 4:
		return "Thursday"
	case 5:
		return "Friday"
	case 6:
		return "Saturday"
	case 7:
		return "Sunday"
	default:
		return "Invalid day"
	}
}

// Switch with no expression
func monthOfYear(month int) string {
	switch {
	case month == 1:
		return "January"
	case month == 2:
		return "February"
	case month == 3:
		return "March"
	case month == 4:
		return "April"
	case month == 5:
		return "May"
	case month == 6:
		return "June"
	case month == 7:
		return "July"
	case month == 8:
		return "August"
	case month == 9:
		return "September"
	case month == 10:
		return "October"
	case month == 11:
		return "November"
	case month == 12:
		return "December"
	default:
		return "Invalid month"
	}
}

// Switch with return statement
func returnDay(day int) string {
	var today string
	switch {
	case day == 1:
		today = "Monday"
	case day == 2:
		today = "Tuesday"
	case day == 3:
		today = "Wednesday"
	}

	return today
}

// Switch with fallthrough
func fallthroughDay(day int) string {
	var today string
	switch {
	case day == 1:
		today = "Monday"
		fallthrough
	case day == 2:
		today = "Tuesday"
		fallthrough
	case day == 3:
		today = "Wednesday"
		fallthrough
	case day == 4:
		today = "Thursday"
		fallthrough
	case day == 5:
		today = "Friday"
		fallthrough
	case day == 6:
		today = "Saturday"
		fallthrough
	case day == 7:
		today = "Sunday"
	}

	return today
}

func main() {
	today := dayOfWeek(1)
	fmt.Println(today)

	month := monthOfYear(1)
	fmt.Println(month)

	today = returnDay(1)
	fmt.Println(today)

	today = fallthroughDay(1)
	fmt.Println(today)
}

// Output: Monday