const User = require("../Models/User");
const Product = require("../Models/Product");
const Order = require("../Models/Order");

const DashboardController = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce((total, order) => {
      return total + order.totalPrice;
    }, 0);

    return res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const MonthlySalesController = async (req, res) => {
  try {

    const sales = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },

          sales: {
            $sum: "$totalPrice",
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      sales,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const RecentOrdersController = async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(6);

    return res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  DashboardController,
  MonthlySalesController,
  RecentOrdersController,
};