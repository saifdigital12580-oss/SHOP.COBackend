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
        name: item.title,
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
module.exports = {
  DashboardController,
  MonthlySalesController,
  RecentOrdersController,
};