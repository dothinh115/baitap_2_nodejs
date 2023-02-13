const { successCode, failCode } = require("../config/response");
const { sequelize } = require("../models/index");
const initModels = require("../models/init-models");

const model = initModels(sequelize);

const addNewOrder = async (req, res) => {
  try {
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
      successCode(
        res,
        null,
        `${user_name.full_name} đã đặt thành công ${amount} ${food_name.food_name}`
      );
    } else {
      failCode(res, null, `Không tìm ra user hoặc thức ăn!`);
    }
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

module.exports = {
  addNewOrder,
};
