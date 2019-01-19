package data

import "sync"

// Data contains all "managed" data
type Data struct {
	Items []string
	mux   sync.Mutex
}

var content = Data{}
