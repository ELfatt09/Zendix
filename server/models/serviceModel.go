package models

import (
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	User 		User 	`gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	Title 		string
	Description string
	Level 		string
	UserID 		uint
}
