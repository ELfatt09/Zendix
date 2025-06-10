package models

import (
	"gorm.io/gorm"

	"time"
)

type User struct {
	gorm.Model
	Email      string     `gorm:"unique"`
	Password   string
	VerifiedAt *time.Time

	JobID      *uint      `gorm:"column:job_id"`
	Job        Job        `gorm:"foreignKey:JobID;constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	
	PersonalInfoID uint
	PersonalInfo UserPersonalInfo `gorm:"foreignKey:UserID;references:ID;constraint:OnDelete:CASCADE;constraint:OnUpdate:CASCADE;"`
}

type UserPersonalInfo struct {
	gorm.Model
	Fullname string
	Phone string
	Address string
	Gender string `gorm:"type:enum('male', 'female', '');default:null"`
	Description string `gorm:"type:text"`
	PfpPath string

	UserID uint `gorm:"index;not null;unique"`
}

