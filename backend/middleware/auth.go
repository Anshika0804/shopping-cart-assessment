package middleware

import (
    "net/http"
    "os"
    "shoppingcart/database"
    "shoppingcart/models"
    "strings"

    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
            c.Abort()
            return
        }

        tokenString := strings.TrimPrefix(authHeader, "Bearer ")

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return jwtKey, nil
        })

        if err != nil || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        // Get user from DB using token
        var user models.User
        if err := database.DB.Where("token = ?", tokenString).First(&user).Error; err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found for this token"})
            c.Abort()
            return
        }

        // Store user ID in context for future use
        c.Set("userID", user.ID)
        c.Next()
    }
}
