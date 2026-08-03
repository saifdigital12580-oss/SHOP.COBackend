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
    // Top Selling Products

const productMap = {};

orders.forEach((order) => {
  order.products.forEach((item) => {

    if (!productMap[item.title]) {

    productMap[item.title] = {
      title: item.title,
      image: item.image,
      sold: 0,
      revenue: 0,
    };

    }

    productMap[item.title].sold += item.quantity;

    productMap[item.title].revenue += item.price * item.quantity;

  });
});

const topProducts = Object.values(productMap)
.sort((a, b) => b.sold - a.sold)
.slice(0, 5);



    return res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        topProducts,
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
const LatestCustomersController = async (req, res) => {
  try {

    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("username email");

    return res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const LowStockController = async (req, res) => {
  try {

    const products = await Product.find({
      stock: { $lte: 10 }
    })
    .sort({ stock: 1 });

    return res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const CategoryAnalyticsController = async (req, res) => {
  try {

    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      categories,
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
  LatestCustomersController,
  LowStockController,
  CategoryAnalyticsController,
};