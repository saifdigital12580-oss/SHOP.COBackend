const express = require("express")
const OrderRouter = express.Router();

const { PlaceOrderController, GetAllOrders}= require("../Components/orderController")


OrderRouter.post("/place-order", PlaceOrderController)
OrderRouter.get("/all-orders", GetAllOrders);

module.exports = OrderRouter