package models

import (
	"gorm.io/gorm"
)

type Verification_token struct {
	gorm.Model
	Token string
	User      User `gorm:"foreignKey:UserID"`
	UserID    uint 
}
