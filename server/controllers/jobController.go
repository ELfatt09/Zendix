package controllers

import (
	"net/http"
	"go-freelance-app/services"

	"github.com/gin-gonic/gin"

)

func GetAllJobs(c *gin.Context) {
	jobs, err := services.GetAllJobsService()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"jobs": jobs})
}
