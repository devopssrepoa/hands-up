package data

// Create adds a new item
func Create(item string) {
	content.mux.Lock()
	content.Items = append(content.Items, item)
	content.mux.Unlock()
}
