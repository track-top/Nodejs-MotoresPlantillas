const Sequelize = require('sequelize');

const sequelize = require('../helpers/database.helper');

const CartModel = sequelize.define('cart', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
});

module.exports = CartModel;
