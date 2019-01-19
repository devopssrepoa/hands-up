package data

// Delete removes an item from the collection
func Delete(item string) {
	content.mux.Lock()
	tempData := []string{}
	for i := 0; i < len(content.Items); i++ {
		if item == content.Items[i] {
			continue
		}
		tempData = append(tempData, content.Items[i])
	}

	content.Items = tempData
	content.mux.Unlock()
}
