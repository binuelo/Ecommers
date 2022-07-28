const { db, DataTypes } = require("../utils/database.util");
const ProductInCart = db.define("productincart", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = { ProductInCart };

/*  if ((productInventory.id === productCa.productId) === true) {
    res.status(201).json({
      message: "Product Exist  ",
    });
    next();
  }
 */
