package location

import (
	"strings"
)

func AddressType(address string) string {
	validTypes := []string{"street", "avenue", "boulevard", "drive", "court", "place", "square", "lane", "road", "trail", "parkway", "commons"}
	input := strings.ToLower(address)
	output := strings.Split(input, " ")[0]

	for _, validType := range validTypes {
		if strings.EqualFold(output, validType) {
			return validType
		}
	}

	return "Invalid address type"
}
