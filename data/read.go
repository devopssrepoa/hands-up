package data

// Read returns all available data
func Read() []string {
	return content.Items
}

// Exists tests if an item already exists in the collection
func Exists(item string) bool {
	for _, val := range content.Items {
		if val == item {
			return true
		}
	}

	return false
}
