module.exports = (sequelize, DataTypes) => sequelize.define('inventory', {
  name: DataTypes.STRING, // Item name
  description: DataTypes.STRING, // Item description
  quantity: DataTypes.INTEGER, // Quantity of items in stock
});
