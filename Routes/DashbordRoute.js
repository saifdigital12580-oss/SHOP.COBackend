const express = require("express");

const router = express.Router();


const { MonthlySalesController,DashboardController ,RecentOrdersController, } = require("../Components/DashboardController");


router.get("/stats", DashboardController);
router.get("/monthly-sales", MonthlySalesController);
router.get("/recent-orders", RecentOrdersController);

module.exports = router;