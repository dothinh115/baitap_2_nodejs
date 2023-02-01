const { sequelize } = require("../models/index");
const initModels = require("../models/init-models");

const model = initModels(sequelize);

const addNewOrder = async (req, res) => {
  const { user_id, food_id, amount } = req.body;
  const user_name = await model.users.findOne({
    where: {
      user_id,
    },
  });
  const food_name = await model.food.findOne({
    where: {
      food_id,
    },
  });

  if (user_name.full_name && food_name.food_name) {
    const newOrder = {
      user_id,
      food_id,
      amount,
      code: "abc",
      arr_sub_id: "123",
    };
    await model.orders.create(newOrder);
    res
      .status(200)
      .send(
        `${user_name.full_name} đã đặt thành công ${amount} ${food_name.food_name}`
      );
  } else {
    res.status(400).send(`Không tìm ra user hoặc thức ăn!`);
  }
};

module.exports = {
  addNewOrder,
};
