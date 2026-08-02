
const sendEmail = require("../Utils/sendEmail");
const bcrypt = require('bcrypt');
const User = require('../Models/User');
// const Order = require('../models/Order');
const Product = require('../Models/Product')
const jwt = require('jsonwebtoken');

const userRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

  const role =
  email.toLowerCase() === "saifdigital12580@gmail.com"
    ? "admin"
    : "user";

    const user = new User({
      username,
      email,
      password: hashpassword, // 🔥 FIXED
      role,
    });

    await user.save(); // 🔥 IMPORTANT

    return res.status(201).json({
      message: "Registered Successfully",
      user,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


const userLoginController = async (req, res, next) => {
  try {

    // console.log(req.body)
    const { email, password } =  req.body;

    console.log("cheaking------1")

    if (!email || !password) {
      return res.status(401).json({ message: "Missing Email & password!" })
    }

    console.log("cheaking-----2")

    const user = await User.findOne({ email })
    

    console.log("cheaking-----3", user)

    if (!user) {
      return res.status(401).json({ message: "User is not found!" })
    }

    console.log("Cheaking----4")
 
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Correct password!" })
    }


    console.log("cheaking------5")

    const token = await jwt.sign(
      { id: user._id, username: user.username, email: user.email , role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
     
    console.log("cheaking----6", token)

    res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
});

    console.log("cheaking------7")

    // ================= EMAIL TO USER =================
// ======== LOGIN RESPONSE PEHLE ========

res.status(200).json({
  success: true,
  message: "Login is Done 🔐 !",
  role: user.role,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  },
});

// ======== USER EMAIL (Background) ========

sendEmail(
  user.email,
  "🎉 Welcome Back to SHOP.CO",
  `
  <div style="font-family:Arial;padding:20px">
    <h2>Welcome Back, ${user.username} 👋</h2>
    <p>You have successfully logged in to <b>SHOP.CO</b>.</p>
    <p>We're happy to see you again ❤️</p>
    <hr>
    <p><b>Login Time:</b> ${new Date().toLocaleString()}</p>
  </div>
  `
).catch(console.error);

// ======== OWNER EMAIL (Background) ========

sendEmail(
  process.env.OWNER_USER,
  "🚨 User Logged In",
  `
  <h2>New Login Detected</h2>
  <p><b>Name:</b> ${user.username}</p>
  <p><b>Email:</b> ${user.email}</p>
  <p><b>Role:</b> ${user.role}</p>
  `
).catch(console.error);

return;


  }catch (error) {
  console.log(error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
}



const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" })
  } catch (error) {
    console.log("Server Error : ", error.message)
  }
}


const authCheckController = (req, res) => {
  try {
     return res.status(200).json({message:"Verified !"})
  } catch (error) {
    console.log("Server Error : ", error.message)
  }
}
const MyProfileController = async (req, res) => {
  try {

    console.log("req.user =", req.user);

    const user = await User.findById(req.user.id).select("-password");

    console.log("DB user =", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const UpdateProfileController = async (req, res) => {
  try {
    const { username, phone, address, profileImage } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};











const UserGetController = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log("Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





const DeleteUserController = async (req, res) => {
  try {
    console.log("Delete ID:", req.params.id);

    const user = await User.findByIdAndDelete(req.params.id);

    console.log("Deleted User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};







// const DeleteMultipleUsersController = async (req, res) => {
//   try {
//     const { ids } = req.body;

//     await User.deleteMany({
//       _id: { $in: ids },
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Users deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };






module.exports = {userRegisterController,userLoginController,logout,authCheckController,UserGetController,DeleteUserController,MyProfileController,UpdateProfileController};