package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"zendix/controllers"
	"zendix/initializers"
	middlewares "zendix/middleware"
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

	r.Static("/static", "./storage")

	auth := r.Group("/auth/")
	jobs := r.Group("/jobs/")
	profile := r.Group("/profile/")


	auth.POST("/register", controllers.Register)
	auth.POST("/login", controllers.LogIn)

	profile.PUT("/edit", middlewares.RequireVerification, controllers.EditUserInfo)
	profile.PUT("edit//pfp", middlewares.RequireVerification, controllers.EditUserPfp)

	auth.GET("/validate", controllers.IsValid)
	auth.GET("/data", middlewares.RequireAuth, controllers.GetAuthenticatedUserData)
	auth.POST("/verification", controllers.EmailVerification)
	auth.GET("/verified", controllers.IsVerified)
	auth.POST("/verification/resend", controllers.SendVerificationEmail)
	auth.PUT("/password", middlewares.RequireAuth, middlewares.RequireVerification, controllers.ChangePassword)

	jobs.GET("/", controllers.GetAllJobs)

	r.Run()
}
