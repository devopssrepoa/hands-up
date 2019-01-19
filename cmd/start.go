package cmd

import (
	"log"
	"os"

	"github.com/devopssrepoa/hands-up/webapp"
)

// Start runs the application starting the embedded webserver
func Start() {
	log.Println("Hands Up 0.1")

	err := webapp.StartServer()
	if err != nil {
		log.Printf("Could not start webserver: %v", err)
		os.Exit(2)
	}
}
