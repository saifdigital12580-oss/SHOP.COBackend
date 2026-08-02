const Product = require("../Models/Product");

const ProductsCreateController = async (req, res) => {
    try {
        console.log("BODY:", req.body);


  if (!req.file) {
  return res.status(400).json({
    success: false,
    message: "Product image is required",
  });
}

const {
  name,
  description,
  price,
  category,
  stock,
} = req.body;

const image = req.file ? req.file.path : "";

const product = await Product.create({
  name,
  description,
  price,
  category,
  stock,
  image,
});

        console.log("Saved Product:", product);

        return res.status(201).json({
            success: true,
            message: "PRODUCT CREATED :)",
            product,
        });
    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};








const GetProductController = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const DeleteProductController = async (req,res) => {
  try {
     const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
 
}







const productUpdatecontroller = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Body:", req.body);
    console.log("Params ID:", id);

const updateData = {
  name: req.body.name,
  description: req.body.description,
  price: req.body.price,
  category: req.body.category,
  stock: req.body.stock,
};

if (req.file) {
  updateData.image = req.file.path;
}

const product = await Product.findByIdAndUpdate(
  id,
  updateData,
  {
    new: true,
  }
);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const GetSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};








module.exports = { ProductsCreateController,GetProductController,DeleteProductController ,GetSingleProductController, productUpdatecontroller};