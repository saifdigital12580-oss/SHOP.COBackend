const express = require("express");

const router = express.Router();


const { MonthlySalesController,DashboardController ,RecentOrdersController,LatestCustomersController,LowStockController ,CategoryAnalyticsController,} = require("../Components/DashboardController");


router.get("/stats", DashboardController);
router.get("/monthly-sales", MonthlySalesController);
router.get("/recent-orders", RecentOrdersController);
router.get("/latest-customers",LatestCustomersController);
router.get(  "/low-stock",  LowStockController);
router.get("/category-analytics",CategoryAnalyticsController);
module.exports = router;