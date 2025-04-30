package controllers

import (
	"net/http"

	"go-freelance-app/services"
	"go-freelance-app/utils"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var body struct {
		Email    string
		Password string
		Username string
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	if !utils.ValidateEmail(body.Email) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email"})
		return
	}

	user, err := services.RegisterService(body.Email, body.Password, body.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registered successfully", "user": user})
}

func LogIn(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters"})
		return
	}

	tokenString, err := services.LogInService(body.Email, body.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Authentication Successful",
		"token":   tokenString,
	})
}

func GetAuthenticatedUserData(c *gin.Context) {
	tokenString, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	user, err := services.GetAuthenticatedUserDataService(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"email":    user.Email,
		"username": user.Username,
		"pfpPath":  user.PfpPath,
		"bio":      user.Bio,
		"jobId": 	user.JobID,
		"job": 		user.Job,
	})
}
func IsValid(c *gin.Context) {
	tokenString, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}


	if _, err := services.ValidateAuthTokenService(tokenString); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"auth": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"auth": true})
}

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
	err = services.VerifyUser(tokenString, body.Token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email verified successfully"})
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email sent successfully"})
}

func EditUserInfo(c *gin.Context) {
	var body struct {
		Username string
		Bio      string
		PfpPath  string
		JobID    *uint
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters"})
		return
	}

	tokenString, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	user, err := services.EditUserInfoService(tokenString, body.Username, body.Bio, body.PfpPath, body.JobID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"username": user.Username,
		"pfpPath":  user.PfpPath,
		"bio":      user.Bio,
		"jobId": 	user.JobID,
	})
}


func IsVerified(c *gin.Context){
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
