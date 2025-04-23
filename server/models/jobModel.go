package models

import (
	"gorm.io/gorm"
)

type Job struct {
	gorm.Model
	Job_ID uint
	Name string
}