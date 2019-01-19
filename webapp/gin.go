package webapp

import "github.com/gin-gonic/gin"

var router = gin.Default()

// StartServer starts then gin webserver
func StartServer() error {
	return router.Run()
}
