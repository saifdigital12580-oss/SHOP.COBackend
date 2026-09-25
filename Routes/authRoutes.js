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
  GetNotificationsController,
  
} = require("../Components/authController");

const authMiddleware = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/adminMiddleware");

const authRouter = express.Router();

authRouter.post("/register-user", userRegisterController);
authRouter.post("/login-user", userLoginController);
authRouter.post("/logout-user", logout);
// authRouter.delete("/delete-user/:id",authMiddleware,adminMiddleware,DeleteUserController);
authRouter.get(
    "/get-user",
    authMiddleware,
    adminMiddleware,
    UserGetController
);
authRouter.delete(
    "/delete-users/:id",
    authMiddleware,
    adminMiddleware,
    DeleteUserController
);

authRouter.get("/auth-check",authMiddleware,authCheckController);
authRouter.get( "/my-profile", authMiddleware, MyProfileController );
authRouter.put( "/update-profile", authMiddleware, UpdateProfileController );

authRouter.get(
  "/notifications",
  authMiddleware,
  adminMiddleware,
  GetNotificationsController
);

module.exports = authRouter;