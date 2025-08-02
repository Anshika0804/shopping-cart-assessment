package database

import (
    "log"
    "shoppingcart/models"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
    var err error
    DB, err = gorm.Open(sqlite.Open("shopping.db"), &gorm.Config{})
    if err != nil {
        log.Fatal("❌ Failed to connect to database:", err)
    }

    err = DB.AutoMigrate(&models.User{}, &models.Item{}, &models.Cart{}, &models.Order{})
    if err != nil {
        log.Fatal("❌ Failed to migrate database:", err)
    }

    log.Println("✅ Database connected and migrated")
}
