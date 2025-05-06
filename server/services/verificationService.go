package services

import (
	"errors"
	"log"
	"net/smtp"
	"os"
	"time"
	"zendix/initializers"
	"zendix/models"
	"zendix/utils"
)

func IsUserVerifiedService(tokenString string) (bool, error) {
	claim, err := utils.ParseToken(tokenString)

	if err != nil {
		return false, errors.New("token not valid")
	}

	return claim["verified"].(bool), nil
}

func SendVerificationEmail(userEmail string) error {
	var user models.User
	initializers.DB.Select("username").First(&user, "email = ?", userEmail)
	username := user.Username
	from := os.Getenv("APP_EMAIL_ADDRESS")
	pass := os.Getenv("APP_EMAIL_PASSWORD")
	to := userEmail
	tokenString, err := CreateVerificationToken(userEmail)
	if err != nil {
		return err
	}

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: Hello " + username + "! This is your email verification token.\n\n" +
		"Hello " + username + "! Thank you for Sign Up to Zendix lets get you verified.\n\n" + "Verification Token: " + tokenString

	err = smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return err
	}
	log.Println("Successfully sent to " + to)
	return nil
}

func CreateVerificationToken(userEmail string) (string, error) {
	var user models.User
	var token models.Verification_token

	initializers.DB.First(&user, "email = ?", userEmail)
	id := user.ID

	// Retrieve the existing token data
	var existingToken models.Verification_token
	initializers.DB.Unscoped().Where("user_id = ?", id).First(&existingToken)

	// If existing token data is found, delete it
	// If existing token data is found, delete it
	if existingToken.ID != 0 {
		err := initializers.DB.Delete(&existingToken).Error
		if err != nil {
			log.Println("Error deleting token:", err)
		}
	}

	for {
		verificationToken := utils.GenerateRandomString(6)
		initializers.DB.First(&token, "token = ?", verificationToken)
		if token.ID == 0 {
			token = models.Verification_token{Token: verificationToken, UserID: id}
			initializers.DB.Create(&token)
			return verificationToken, nil
		}
	}
}

func VerifyUser(jwtToken string, verificationToken string) (string, error) {
	var user models.User
	var token models.Verification_token
	claims, err := utils.ParseToken(jwtToken)
	if err != nil {
		return "", errors.New("token not valid")
	}
	UserID := claims["sub"]
	if err := initializers.DB.Where("token = ? AND user_id = ?", verificationToken, UserID).First(&token).Error; err != nil {
		return "", errors.New("verification token not valid")
	}
	initializers.DB.Delete(&token)

	if err := initializers.DB.First(&user, "id = ?", UserID).Error; err != nil {
		return "", errors.New("user not found")
	}
	currentTime := time.Now()
	user.VerifiedAt = &currentTime
	if err := initializers.DB.Save(&user).Error; err != nil {
		return "", errors.New("failed to update user verification status")
	}

	newTokenString, err := utils.CreateToken(user)
	if err != nil {
		return "", err
	}
	return newTokenString, nil
}
