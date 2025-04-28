package middlewares

import (
	"go-freelance-app/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RequireVerification(c *gin.Context) {
	authToken, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	claims, err := utils.ParseToken(authToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	if !claims["verified"].(bool) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User is not verified"})
		return
	}

	c.Next()


	
}