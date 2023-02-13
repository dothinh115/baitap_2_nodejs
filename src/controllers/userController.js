// const User = require("../../save/user");
const { successCode, errorCode, failCode } = require("../config/response");
const { sequelize } = require("../models/index");
const initModels = require("../models/init-models");

const model = initModels(sequelize);

const getAllUsers = async (req, res) => {
  try {
    const data = await model.users.findAll();
    successCode(res, data, "Thành công!");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    //bất đồng bộ, phải chờ User kết nối csdl => lấy data
    //   const data = await User.findAll();

    //   Tìm tất cả những dòng có user_id === id
    //   Tìm 1 dòng => object => .findOne
    const data = await model.users.findOne({
      where: {
        user_id: id,
      },
    });
    if (data) successCode(res, data, "Thành công!");
    else failCode(res, null, "Không tìm thấy user");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

const createUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    await model.users.create({
      full_name,
      email,
      password,
    });
    successCode(res, null, "Thêm user mới thành công!");
  } catch (error) {
    res.status(500).send("Lỗi backend");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await model.users.destroy({
      where: {
        user_id: id,
      },
    });
    successCode(res, null, "Xóa thành công!");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.users.findOne({
      where: {
        user_id: id,
      },
    });
    if (data) {
      const { full_name, email, password } = req.body;
      const userData = {
        full_name,
        email,
        password,
      };
      const result = await model.users.update(userData, {
        where: {
          user_id: id,
        },
      });
      if (result[0] == 1) successCode(res, null, "Update user thành công!");
      else res.status(200).send("Không có gì thay đổi!");
    } else {
      failCode(res, null, "Không tìm thấy user");
    }
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

module.exports = {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
