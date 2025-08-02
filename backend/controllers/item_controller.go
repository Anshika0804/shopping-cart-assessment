package controllers

import (
    "net/http"
    "shoppingcart/database"
    "shoppingcart/models"

    "github.com/gin-gonic/gin"
)

func CreateItem(c *gin.Context) {
    var item models.Item
    if err := c.ShouldBindJSON(&item); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    if err := database.DB.Create(&item).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create item"})
        return
    }

    c.JSON(http.StatusCreated, item)
}

func ListItems(c *gin.Context) {
    var items []models.Item
    if err := database.DB.Find(&items).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch items"})
        return
    }

    c.JSON(http.StatusOK, items)
}
