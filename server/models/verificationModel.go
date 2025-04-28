package models

import (
	"gorm.io/gorm"
)

type Verification_token struct {
	gorm.Model
	Token string
	User  User `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;constraint:OnUpdate:CASCADE"`
	UserID uint
}
