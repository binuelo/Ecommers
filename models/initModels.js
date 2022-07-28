// Models
const { User } = require("./users.model");
const { Product } = require("./product.models");
const { Categorie } = require("./categories.model");
const { ProductImg } = require("./productImgs.model");
const { Order } = require("./order.model");
const { Cart } = require("./carts.model");
const { ProductInCart } = require("./productsInCart.model");

const initModels = () => {
  // 1 User <----> M Order
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  User.hasMany(Product, { foreignKey: "userId" });
  Product.belongsTo(User);

  // 1 User & 1
  User.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(User);

  Cart.hasOne(Order, { foreignKey: "cartId" });
  Order.belongsTo(Cart);

  // 1 Cart <----> M ProductInCart
  Cart.hasMany(ProductInCart, { foreignKey: "cartId" });
  ProductInCart.belongsTo(Cart);

  // 1 Product & 1
  Product.hasOne(ProductInCart, { foreignKey: "productId" });
  ProductInCart.belongsTo(Product);

  Categorie.hasOne(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Categorie);

  //1 PRoduct <----> //? M
  Product.hasMany(ProductImg, { foreignKey: "productId" });
  ProductImg.belongsTo(Product);
};

/*cProductonst initModels = () => {
	// 1 User <----> M Post
	User.hasMany(Post, { foreignKey: 'userId' });
	Post.belongsTo(User);

	// 1 User <----> M Comment
	User.hasMany(Comment, { foreignKey: 'userId' });
	Comment.belongsTo(User);

	// 1 Post <----> M Comment
	Post.hasMany(Comment, { foreignKey: 'postId' });
	Comment.belongsTo(Post);

	// 1 Post <----> M PostImg
	Post.hasMany(PostImg, { foreignKey: 'postId' });
	PostImg.belongsTo(Post);
};
*/
module.exports = { initModels };
