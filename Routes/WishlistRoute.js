const express = require("express");

const WishlistRoute = express.Router();
const { AddWishlistController, GetWishlistController, RemoveWishlistController } = require("../Components/WishlistController");


WishlistRoute.post("/add",AddWishlistController);

WishlistRoute.get("/:userId",GetWishlistController);

WishlistRoute.delete("/remove/:id",RemoveWishlistController);

module.exports= WishlistRoute;