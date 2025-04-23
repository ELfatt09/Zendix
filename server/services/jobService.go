package services

import (
	"go-freelance-app/initializers"
	"go-freelance-app/models"
)

func GetAllJobsService() ([]models.Job, error) {
	var jobs []models.Job

	err := initializers.DB.Find(&jobs).Error
	return jobs, err
}
