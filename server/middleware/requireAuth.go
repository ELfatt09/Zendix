package middlewares

import (
	"net/http"

	"go-freelance-app/services"
	"go-freelance-app/utils"

	"github.com/gin-gonic/gin"
)

func RequireAuth(c *gin.Context) {
	tokenString, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	if _, err := services.ValidateAuthTokenService(tokenString); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.Next()
}