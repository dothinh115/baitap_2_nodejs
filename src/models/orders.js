const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return orders.init(sequelize, DataTypes);
}

class orders extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'food',
        key: 'food_id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    arr_sub_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "food_id",
        using: "BTREE",
        fields: [
          { name: "food_id" },
        ]
      },
    ]
  });
  }
}
