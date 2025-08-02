package main

import (
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "log"
    "shoppingcart/database"
    "shoppingcart/routes"
    "shoppingcart/middleware"
)


func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("❌ Error loading .env file")
    }

    r := gin.Default()

    // Register the CORS middleware before routes
    r.Use(middleware.CORSMiddleware())


    database.Connect()
    routes.SetupRoutes(r)

    r.Run(":8080")
}
