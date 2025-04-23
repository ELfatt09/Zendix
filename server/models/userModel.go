package models

import (
	"gorm.io/gorm"

	"time"
)

type User struct {
	gorm.Model
	Email    	string 		`gorm:"unique"`
	Password 	string
	Username 	string
	Bio      	string 		`gorm:"type:text"`
	PfpPath  	string
	Job 	 	Job 		`gorm:"foreignKey:JobID;constraint:OnDelete:CASCADE;constraint:OnUpdate:CASCADE"`
	JobID 	 	*uint		`gorm:"column:job_id;default:null"`
	VerifiedAt 	*time.Time 	`gorm:"default:null"`
}