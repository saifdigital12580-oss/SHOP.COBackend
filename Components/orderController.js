// const Order = require("../Models/Order");



// const orderpostcontroller = async (req, res) => {

//     try {

//         console.log("Body:", req.body);


//         const order = await Order.create(req.body);


//         return res.status(201).json({

//             success: true,
//             message: "ORDER SAVED SUCCESSFULLY",
//             order

//         });


//     } catch (error) {

//         console.log("Error:", error.message);

//         return res.status(500).json({

//             success:false,
//             message:error.message

//         });

//     }

// };


// module.exports = { orderpostcontroller };








const Order = require("../Models/Order");

const PlaceOrderController = async (req, res) => {
  try {

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





const GetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};






module.exports = {PlaceOrderController,GetAllOrders};