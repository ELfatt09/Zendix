package models

import (
	"gorm.io/gorm"

	"time"
)

type User struct {
	gorm.Model
	Email      string     `gorm:"unique"`
	Password   string
	Username   string
	Bio        string     `gorm:"type:text"`
	PfpPath    string
	JobID      *uint      `gorm:"column:job_id"`
	Job        Job        `gorm:"foreignKey:JobID;constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	VerifiedAt *time.Time
}