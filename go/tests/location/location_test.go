package location

import "testing"

type testCase struct {
	address  string
	expected string
}

func TestAddressType(t *testing.T) {

	// Run tests in parallel
	// t.Parallel() 

	testCases := []testCase{
		{address: "123 Main Street", expected: "Invalid address type"},
		{address: "Avenue Wall Street, New York, NY 10005", expected: "avenue"},
		{address: "Street Wall Street, New York, NY 10005", expected: "street"},
		{address: "Boulevard Wall Street, New York, NY 10005", expected: "boulevard"},
		{address: "Drive Wall Street, New York, NY 10005", expected: "drive"},
		{address: "Court Wall Street, New York, NY 10005", expected: "court"},
		{address: "Place Wall Street, New York, NY 10005", expected: "place"},
		{address: "Square Wall Street, New York, NY 10005", expected: "square"},
		{address: "Lane Wall Street, New York, NY 10005", expected: "lane"},
		{address: "Road Wall Street, New York, NY 10005", expected: "road"},
		{address: "Trail Wall Street, New York, NY 10005", expected: "trail"},
		{address: "Parkway Wall Street, New York, NY 10005", expected: "parkway"},
		{address: "Commons Wall Street, New York, NY 10005", expected: "commons"},
	}

	for _, test := range testCases {
		actual := AddressType(test.address)
		if actual != test.expected {
			t.Errorf("Expected %s, got %s", test.expected, actual)
		}
	}
}
