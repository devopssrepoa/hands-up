package webapp

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/devopssrepoa/hands-up/data"
	"github.com/gin-gonic/gin"
)

func getHands(c *gin.Context) {
	out := data.Read()
	if out == nil {
		out = []string{}
	}

	c.JSON(http.StatusOK, map[string]interface{}{"hands": out})
}

func addHand(c *gin.Context) {
	who := c.PostForm("who")

	if err := validate(who, true); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	data.Create(who)
	c.JSON(http.StatusOK, map[string]string{"result": fmt.Sprintf("%s rised hand", who)})
}

func dropHand(c *gin.Context) {
	who := c.PostForm("who")

	if err := validate(who, false); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if !data.Exists(who) {
		c.JSON(http.StatusBadRequest, map[string]string{"error": fmt.Sprintf("%s already dropped hand", who)})
		return
	}

	data.Delete(who)
	c.JSON(http.StatusOK, map[string]string{"result": fmt.Sprintf("%s dropped hand", who)})
}

func validate(who string, checkExistence bool) error {

	if who == "" {
		return errors.New("Missing person")
	}

	if checkExistence {
		if data.Exists(who) {
			return errors.New("Person already saved")
		}
	}

	return nil
}
