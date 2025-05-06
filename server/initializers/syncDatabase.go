package initializers

import "zendix/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Service{})
	DB.AutoMigrate(&models.Job{})
	DB.AutoMigrate(&models.Verification_token{})
}
