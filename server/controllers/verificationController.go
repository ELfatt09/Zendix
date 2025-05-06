package controllers

import (
	"net/http"
	"zendix/services"
	"zendix/utils"

	"github.com/gin-gonic/gin"
)

func EmailVerification(c *gin.Context) {
	var body struct {
		Token string
	}
	tokenString, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	c.BindJSON(&body)
	newTokenString, err := services.VerifyUser(tokenString, body.Token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email verified successfully", "token": newTokenString})
}

func SendVerificationEmail(c *gin.Context) {
	tokenString, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	parsedToken, err := utils.ParseToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	userEmail := parsedToken["email"].(string)

	err = services.SendVerificationEmail(userEmail)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send verification email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email sent successfully"})
}

func IsVerified(c *gin.Context) {
	tokenString, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	verified, err := services.IsUserVerifiedService(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"verified": false})
	}

	c.JSON(http.StatusOK, gin.H{"verified": verified})
}
