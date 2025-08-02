package models

import "gorm.io/gorm"

type User struct {
    gorm.Model
    Username string `gorm:"unique"`
    Password string
    Token    string
	CartID   *uint // Foreign Key to Cart
}

type Item struct {
    gorm.Model
    Name        string
    Description string
    Price       float64
	Status      string
}

type Cart struct {
    gorm.Model
    UserID uint
	Name   string
    Status string
    Items  []Item `gorm:"many2many:cart_items"`
}

type Order struct {
    gorm.Model
    UserID uint
	CartID uint
    Items  []Item `gorm:"many2many:order_items"`
}
