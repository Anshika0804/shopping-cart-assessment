package controllers

import (
    "net/http"
    "shoppingcart/database"
    "shoppingcart/models"

    "github.com/gin-gonic/gin"
)

func CreateOrder(c *gin.Context) {
    userID, _ := c.Get("userID")

    // Find user cart
    var cart models.Cart
    if err := database.DB.Where("user_id = ?", userID).Preload("Items").First(&cart).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Cart not found"})
        return
    }

    if len(cart.Items) == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Cart is empty"})
        return
    }

    // Create order from cart
    order := models.Order{
		UserID: userID.(uint),
		CartID: cart.ID,
		Items:  cart.Items,
	}


    if err := database.DB.Create(&order).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
        return
    }

    // Clear cart after order
    database.DB.Model(&cart).Association("Items").Clear()

    c.JSON(http.StatusCreated, gin.H{"message": "Order placed successfully", "order_id": order.ID})
}

func ListOrders(c *gin.Context) {
    userID, _ := c.Get("userID")

    var orders []models.Order
    if err := database.DB.Where("user_id = ?", userID).Preload("Items").Find(&orders).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch orders"})
        return
    }

    c.JSON(http.StatusOK, orders)
}
