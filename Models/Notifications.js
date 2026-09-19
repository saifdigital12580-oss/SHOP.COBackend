const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "user-login",
    },

    message: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notifications", notificationsSchema);