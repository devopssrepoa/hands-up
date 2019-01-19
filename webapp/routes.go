package webapp

import "github.com/gin-gonic/gin"

// var route
var apiRoute *gin.RouterGroup

func init() {
	apiRoute = router.Group("/api")

	apiRoute.GET("/hands", getHands)
	apiRoute.POST("/hands/rise", addHand)
	apiRoute.POST("/hands/drop", dropHand)

	router.Static("/ui/", "./static")
}
