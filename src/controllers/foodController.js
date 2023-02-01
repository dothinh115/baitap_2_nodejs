const { sequelize, conn } = require("../models/index");
const initModels = require("../models/init-models");

const model = initModels(sequelize);

const getAllFood = async (req, res) => {
  try {
    const data = await model.food.findAll({
      include: ["type"], // chuỗi, hoặc là mảng chuỗi
    });

    if (data) res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Lỗi backend");
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
    if (data) res.status(200).send(data);
    else res.status(400).send("Không tìm ra kết quả!");
  } catch (error) {
    res.status(500).send("Lỗi backend");
  }
};

const getAllFoodType = async (req, res) => {
  try {
    const data = await model.food_type.findAll();
    if (data) res.send(data);
  } catch (error) {
    res.status(500).send("Lỗi backend");
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
    res.status(500).send("Lỗi backend");
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
    res.status(500).send("Lỗi backend");
  }
};

module.exports = {
  getAllFood,
  getFood,
  getAllFoodType,
  addNewFood,
  addNewFoodType,
};
