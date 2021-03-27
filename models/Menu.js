const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    menuName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isParent: {
      type: Boolean,
      required: true,
    },
    parentId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("menu", menuSchema);
