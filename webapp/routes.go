package webapp

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// var route
var apiRoute *gin.RouterGroup

func init() {
	apiRoute = router.Group("/api")

	apiRoute.GET("/hands", getHands)
	apiRoute.POST("/hands/rise", addHand)
	apiRoute.POST("/hands/drop", dropHand)

	router.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/ui/presentation")
	})

	router.Static("/ui/", "./static")
}
