package controllers

import (
    "net/http"
    "shoppingcart/database"
    "shoppingcart/models"
    "time"

    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"
)

import "os"
import "strings"

var jwtKey = []byte(os.Getenv("JWT_SECRET"))
type Claims struct {
    Username string
    jwt.StandardClaims
}

func CreateUser(c *gin.Context) {
    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    // Trim username and password
    user.Username = strings.TrimSpace(user.Username)
    user.Password = strings.TrimSpace(user.Password)

    if err := database.DB.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
        return
    }

    c.JSON(http.StatusCreated, user)
}

func LoginUser(c *gin.Context) {
    var credentials models.User
    if err := c.ShouldBindJSON(&credentials); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    // Trim inputs before querying
    username := strings.TrimSpace(credentials.Username)
    password := strings.TrimSpace(credentials.Password)

    var user models.User
    if err := database.DB.Where("username = ? AND password = ?", username, password).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
        return
    }

    // Generate token
    expirationTime := time.Now().Add(24 * time.Hour)
    claims := &Claims{
        Username: user.Username,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not login"})
        return
    }

    // Save token to DB 
    user.Token = tokenString
    database.DB.Save(&user)

    c.JSON(http.StatusOK, gin.H{"token": tokenString})
}


func ListUsers(c *gin.Context) {
    var users []models.User
    database.DB.Find(&users)
    c.JSON(http.StatusOK, users)
}
