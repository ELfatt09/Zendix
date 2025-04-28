package services

import (
	"errors"
	"go-freelance-app/initializers"
	"go-freelance-app/models"
	"go-freelance-app/utils"
	"log"
	"net/smtp"
	"os"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// RegisterService registers a new user in the database, given their email, password, and username.
// The password is hashed with bcrypt and the user is created with the given email and username.
// An error is returned if there is an issue generating the hash, or if there is an issue
// creating the user in the database. The function also sends a verification email to the user's
// email address.
func RegisterService(email, password, username string) (models.User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return models.User{}, err
	}

	user := models.User{Email: email, Password: string(hash), Username: username}
	if err := initializers.DB.Create(&user).Error; err != nil {
		return models.User{}, err
	}

	SendVerificationEmail(email, username)

	return user, nil
}


// LogInService authenticates a user by verifying their email and password.
// It retrieves the user from the database using the provided email and
// compares the stored hashed password with the provided password using bcrypt.
// If authentication is successful, a JWT token is generated and returned.
// Returns an error if the user is not found, the password is invalid, or
// if there is an issue creating the token.
func LogInService(email, password string) (string, error) {
	var user models.User
	initializers.DB.First(&user, "email = ?", email)
	if user.ID == 0 {
		return "", errors.New("user not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", errors.New("invalid password")
	}

	tokenString, err := utils.CreateToken(user)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// GetAuthenticatedUserDataService retrieves the user associated with the given JWT token.
// The token is parsed and the user is retrieved from the database using the sub claim.
// If the token is invalid, an error is returned. Otherwise, the user is returned.
func GetAuthenticatedUserDataService(tokenString string) (models.User, error) {
	claim, err := utils.ParseToken(tokenString)

	if err != nil {
		return models.User{}, errors.New("token not valid")
	}

	var user models.User
	initializers.DB.First(&user, "id = ?", claim["sub"])

	return user, nil
}



func EditUserInfoService(tokenString, username, bio, pfpPath string) (models.User, error) {
	claim, err := utils.ParseToken(tokenString)
	if err != nil {
		return models.User{}, errors.New("token not valid")
	}

	var user models.User
	initializers.DB.First(&user, "id = ?", claim["sub"])

	user.Username = username
	user.Bio = bio
	user.PfpPath = pfpPath

	if err := initializers.DB.Save(&user).Error; err != nil {
		return models.User{}, err
	}

	return user, nil
}

// ValidateAuthTokenService validates the provided JWT token string.
// It parses the token to extract claims and checks if the token is expired.
// Returns true if the token is valid and not expired, along with a nil error.
// Returns false with an error if the token is invalid or expired.
func ValidateAuthTokenService(tokenString string) (bool, error) {
	claim, err := utils.ParseToken(tokenString)

	if err != nil {
		return false, errors.New("token not valid")
	}

	if utils.IsTokenExpired(claim) {
		return false, errors.New("token expired")
	}
	var user models.User
	initializers.DB.First(&user, "id = ?", claim["sub"])

	return true, nil
}

func SendVerificationEmail(userEmail string, username string) error {
	from := os.Getenv("APP_EMAIL_ADDRESS")
	pass := os.Getenv("APP_EMAIL_PASSWORD")
	to := userEmail
	tokenString, err := CreateVerificationToken(userEmail)
	if err != nil {
		return err
	}


	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: Hello " + username + "!\n\n" +
		"This is your verification token: " + tokenString

	err = smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
	}
	log.Println("Successfully sended to " + to)
	return err
}

func CreateVerificationToken(userEmail string) (string, error) {
	var user models.User
	var token models.Verification_token

	initializers.DB.First(&user, "email = ?", userEmail)
	id := user.ID

	verificationToken := utils.GenerateRandomString(6)
	initializers.DB.First(&token, "Token = ?", verificationToken)
	if token.ID != 0 {
		return CreateVerificationToken(userEmail)
	}
	
	token = models.Verification_token{Token: verificationToken, UserID: id}
	initializers.DB.Create(&token)

	return verificationToken, nil
}

func VerifyUser(jwtToken string, verificationToken string) error {
	var user models.User
	var token models.Verification_token
	currentTime := time.Now()
	claims, err := utils.ParseToken(jwtToken)
	if err != nil {
		return errors.New("token not valid")
	}
	UserID := claims["sub"]
	tokenData := initializers.DB.Where("token = ? AND user_id = ?", verificationToken, UserID).First(&token)
	if tokenData.Error != nil {
		return errors.New("token not valid")
	}
	initializers.DB.Delete(&token)
	initializers.DB.First(&user, "ID = ?", UserID)
	user.VerifiedAt = &currentTime
	initializers.DB.Save(&user)
	return nil
}