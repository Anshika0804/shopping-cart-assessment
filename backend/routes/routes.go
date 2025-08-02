package routes

import (
    "github.com/gin-gonic/gin"
    "shoppingcart/controllers"
	"shoppingcart/middleware"
)

func SetupRoutes(r *gin.Engine) {
    // Public routes
    r.POST("/users", controllers.CreateUser)
    r.POST("/users/login", controllers.LoginUser)
    r.GET("/users", controllers.ListUsers)

    r.POST("/items", controllers.CreateItem)
    r.GET("/items", controllers.ListItems)


	//Protected routes
	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())

	auth.POST("/carts", controllers.AddToCart)
	auth.GET("/carts", controllers.GetCart)
	auth.POST("/orders", controllers.CreateOrder)
	auth.GET("/orders", controllers.ListOrders)

}
