module.exports = (sequelize, DataTypes) => sequelize.define('inventory', {
  id: {
    type: DataTypes.UUID, // Item ID (primary key) will be UUID
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING, // Item name
  description: DataTypes.STRING, // Item description
  quantity: DataTypes.FLOAT, // Quantity of item in stock
});
