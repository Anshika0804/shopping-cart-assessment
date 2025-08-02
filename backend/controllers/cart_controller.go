package controllers

import (
    "net/http"
    "shoppingcart/database"
    "shoppingcart/models"

    "github.com/gin-gonic/gin"
)

type AddToCartInput struct {
    ItemID uint `json:"item_id"`
}

func AddToCart(c *gin.Context) {
    var input AddToCartInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    userID, _ := c.Get("userID")

    var cart models.Cart
    if err := database.DB.Where("user_id = ?", userID).Preload("Items").First(&cart).Error; err != nil {
        // if No cart found, create one
        cart = models.Cart{
            UserID: userID.(uint),
        }
        database.DB.Create(&cart)
    }

    // Get the item
    var item models.Item
    if err := database.DB.First(&item, input.ItemID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
        return
    }

    // Add item to cart
    database.DB.Model(&cart).Association("Items").Append(&item)

    c.JSON(http.StatusOK, gin.H{"message": "Item added to cart"})
}

func GetCart(c *gin.Context) {
    userID, _ := c.Get("userID")

    var cart models.Cart
    if err := database.DB.Where("user_id = ?", userID).Preload("Items").First(&cart).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Cart not found"})
        return
    }

    c.JSON(http.StatusOK, cart)
}
