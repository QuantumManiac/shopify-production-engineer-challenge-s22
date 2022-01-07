module.exports = (sequelize, DataTypes) => sequelize.define('inventory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING, // Item name
  description: DataTypes.STRING, // Item description
  quantity: DataTypes.INTEGER, // Quantity of items in stock
});
