package models

import (
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	User 		User 	`gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;constraint:OnUpdate:CASCADE"`
	Job 		Job 	`gorm:"foreignKey:JobID;constraint:OnDelete:CASCADE;constraint:OnUpdate:CASCADE"`
	Title 		string
	Description string
	MinPrice 	float64
	MaxPrice 	float64
	JobID		uint
	UserID 		uint
}
