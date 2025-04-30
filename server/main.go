package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"go-freelance-app/controllers"
	"go-freelance-app/initializers"
	middlewares "go-freelance-app/middleware"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDatabase()
}
func main() {

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowHeaders:    []string{"Content-Type", "Authorization", "accept"},
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE"},
	}))

	auth := r.Group("/auth/")
	jobs := r.Group("/jobs/")
	profile := r.Group("/profile/")

	auth.POST("/register", controllers.Register)
	auth.POST("/login", controllers.LogIn)

	profile.PUT("/edit", middlewares.RequireVerification, controllers.EditUserInfo)

	auth.GET("/validate", controllers.IsValid)
	auth.GET("/data", middlewares.RequireAuth, controllers.GetAuthenticatedUserData)
	auth.POST("/verification", controllers.EmailVerification)
	auth.GET("/verified", controllers.IsVerified)
	auth.POST("/verification/resend", controllers.SendVerificationEmail)

	jobs.GET("/", controllers.GetAllJobs)

	r.Run()
}
