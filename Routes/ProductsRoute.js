const express = require("express")
const router = express.Router();
const { ProductsCreateController,  DeleteProductController, productUpdatecontroller, GetProductController, GetSingleProductController }= require("../Components/ProductController")
const upload = require("../Middleware/upload");

router.post(  "/create-product",  upload.single("image"),  ProductsCreateController);
router.get("/all-products", GetProductController);
router.get("/single-product/:id",GetSingleProductController)
router.delete("/delete-product/:id", DeleteProductController);
router.put(  "/update-product/:id",  upload.single("image"),  productUpdatecontroller);

module.exports=router;