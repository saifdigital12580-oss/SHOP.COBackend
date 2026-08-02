const express = require("express");
const app = express();
const { connectDB } = require("./Mongo DB/db");
const productRoutes = require("./Routes/ProductsRoute");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRouter = require("./Routes/authRoutes")
const cors = require("cors");
const OrderRouter = require("./Routes/OrderRoutes");
const DashboardRouter = require("./Routes/DashbordRoute");
const WishlistRoute = require("./Routes/WishlistRoute");




app.use(cors({
  origin: "https://sk-store-theta.vercel.app",
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/product", productRoutes);
app.use("/auth", authRouter);
app.use("/order",OrderRouter);
app.use("/dashboard",DashboardRouter);
app.use("/wishlist", WishlistRoute);

app.get("/", (req, res) => {
    res.send("Api is working------")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is working on ${process.env.PORT}`);
    connectDB();
});