const express = require("express");
const {
  userRegisterController,
  userLoginController,
  logout,
  authCheckController,
  UserGetController,
  DeleteUserController,
  MyProfileController,
  UpdateProfileController,
  
} = require("../Components/authController");

const authMiddleware = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/adminMiddleware");

const authRouter = express.Router();

authRouter.post("/register-user", userRegisterController);
authRouter.post("/login-user", userLoginController);
authRouter.post("/logout-user", logout);
// authRouter.delete("/delete-user/:id",authMiddleware,adminMiddleware,DeleteUserController);
authRouter.get(  "/get-user",  UserGetController);
authRouter.delete("/delete-users/:id",DeleteUserController);

authRouter.get("/auth-check",authMiddleware,authCheckController);
authRouter.get( "/my-profile", authMiddleware, MyProfileController );
authRouter.put( "/update-profile", authMiddleware, UpdateProfileController );

module.exports = authRouter;