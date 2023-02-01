const { sequelize } = require("../models/index");
const initModels = require("../models/init-models");

const model = initModels(sequelize);

const getAllRes = async (req, res) => {
  try {
    const data = await model.restaurant.findAll();
    if (data) res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Lỗi backend");
  }
};

const likeRes = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    const user_name = await model.users.findOne({
      where: {
        user_id,
      },
    });
    const res_name = await model.restaurant.findOne({
      where: {
        res_id,
      },
    });

    const checkIfLiked = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });
    if (checkIfLiked) {
      res
        .status(400)
        .send(`LỖI: ${user_name.full_name} đã like ${res_name.res_name} rồi!`);
    } else {
      const newLike = {
        user_id,
        res_id,
        date_like: new Date(),
      };
      await model.like_res.create(newLike);
      res
        .status(200)
        .send(
          `${user_name.full_name} đã like ${res_name.res_name} thành công!`
        );
    }
  } catch (error) {
    res.status(500).send("Lỗi backend");
  }
};

const unLikeRes = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    const user_name = await model.users.findOne({
      where: {
        user_id,
      },
    });
    const res_name = await model.restaurant.findOne({
      where: {
        res_id,
      },
    });
    const checkIfLiked = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    if (checkIfLiked) {
      await model.like_res.destroy({
        where: {
          user_id,
          res_id,
        },
      });
      res
        .status(200)
        .send(
          `${user_name.full_name} bỏ like ${res_name.res_name} thành công!`
        );
    } else {
      res
        .status(400)
        .send(`LỖI: ${user_name.full_name} chưa like ${res_name.res_name}`);
    }
  } catch (error) {
    res.status(500).send("Lỗi backend");
  }
};

const getLikedRes = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user_name = await model.users.findOne({
      where: {
        user_id,
      },
    });
    if (user_name === null) {
      res.status(400).send(`Không có user này!`);
      return;
    }
    const getLikedRes = await model.restaurant.findAll({
      include: [
        {
          model: model.like_res,
          as: "like_res",
        },
      ],
      where: {
        "$like_res.user_id$": user_id,
      },
    });
    if (getLikedRes.length !== 0) res.status("200").send(getLikedRes);
    else res.status(400).send(`${user_name.full_name} chưa like nhà hàng nào!`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi backend");
  }
};

module.exports = {
  getAllRes,
  likeRes,
  unLikeRes,
  getLikedRes,
};
