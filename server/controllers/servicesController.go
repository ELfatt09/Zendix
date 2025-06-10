package controllers

import (
	"net/http"

	"zendix/utils"
	"zendix/services"

	"github.com/gin-gonic/gin"
)

func GetAllServices(c *gin.Context) {
	services, err := services.GetAllServicesService()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"services": services})
}

// func GetService(c *gin.Context) {
// 	service, err := services.GetServiceService(c.Param("id"))
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"service": service})
// }

func CreateService(c *gin.Context) {
	tokenString, err := utils.GetTokenFromHeader(c.GetHeader("Authorization"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	var body struct {
		Title        string
		Description string
		MinPrice    int
		MaxPrice    int
	}

	c.Bind(&body)

	service, err := services.CreateServiceServices(tokenString, body.Title, body.Description, body.MinPrice, body.MaxPrice)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Service created successfully", "service": service})
}

