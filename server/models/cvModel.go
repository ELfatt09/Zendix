package models

import (
	"gorm.io/gorm"
)

type Cv struct {
	gorm.Model
	User 		User 	`gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;constraint:OnUpdate:CASCADE"`
	Title 		string
	Path 		string
	UserID 		uint
}