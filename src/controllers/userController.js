// const User = require("../../save/user");
const { successCode, errorCode, failCode } = require("../config/response");
const { sequelize } = require("../models/index");
const initModels = require("../models/init-models");
//yarn add bcrypt => mã hóa password

const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwtoken");
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
    const checkExist = await model.users.findOne({
      where: {
        email,
      },
    });
    if (checkExist) failCode(res, null, "Email đã tồn tại!");
    else {
      await model.users.create({
        full_name,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      successCode(res, null, "Thêm user mới thành công!");
    }
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
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

const signUp = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const checkExist = await model.users.findOne({
      where: {
        email,
      },
    });
    if (checkExist) failCode(res, null, "Email đã tồn tại!");
    else {
      await model.users.create({
        full_name,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      successCode(res, null, "Đăng ký thành công!");
    }
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkExist = await model.users.findOne({
      where: {
        email,
      },
    });
    if (checkExist) {
      //so sánh mã hóa (hàm compareSync)
      if (bcrypt.compareSync(password, checkExist.password)) {
        let data = await model.users.findOne({
          where: {
            email,
          },
          attributes: {
            exclude: ["password"], //không trả lại password
          },
        });
        const token = createToken(data);
        successCode(res, { data, token }, "Đăng nhập thành công!");
      } else failCode(res, null, "Email hoặc mật khẩu không đúng!");
    } else failCode(res, null, "Email hoặc mật khẩu không đúng!");
  } catch (error) {
    errorCode(res, null, "Lỗi backend");
    console.log(error);
  }
};

module.exports = {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  signIn,
  signUp,
};
