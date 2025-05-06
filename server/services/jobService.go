package services

import (
	"zendix/initializers"
	"zendix/models"
)

func GetAllJobsService() ([]models.Job, error) {
	var jobs []models.Job

	err := initializers.DB.Find(&jobs).Error
	return jobs, err
}
