const { errorCode, successCode, failCode } = require("../config/response");
const { sequelize, conn } = require("../models/index");
const initModels = require("../models/init-models");

const model = initModels(sequelize);

const getAllFood = async (req, res) => {
  try {
    const data = await model.food.findAll({
      include: ["type"], // chuỗi, hoặc là mảng chuỗi
    });

    if (data) successCode(res, data, "Thành công");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.food.findOne({
      where: {
        food_id: id,
      },
    });
    if (data) successCode(res, data, "Thành công");
    else failCode(res, null, "Không tìm thấy kết quả");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

const getAllFoodType = async (req, res) => {
  try {
    const data = await model.food_type.findAll();
    if (data) successCode(res, data, "Thành công");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

const addNewFood = async (req, res) => {
  try {
    const { food_name, image, price, description, type_id } = req.body;
    const newFood = {
      food_name,
      image,
      price,
      description,
      type_id,
    };
    await model.food.create(newFood);
    res.status(200).send("Thêm thức ăn mới thành công");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

const addNewFoodType = async (req, res) => {
  try {
    const { type_name } = req.body;
    await model.food_type.create({
      type_name,
    });
    res.status(200).send("Thêm loại thức ăn mới thành công");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

module.exports = {
  getAllFood,
  getFood,
  getAllFoodType,
  addNewFood,
  addNewFoodType,
};
