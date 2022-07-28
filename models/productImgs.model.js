const { db, DataTypes } = require("../utils/database.util");
const ProductImg = db.define("productImg", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING(2100), //2083 is the maximum number of characters in a URL
    allowNull: false,
    defaultValue: "active",
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = { ProductImg };
