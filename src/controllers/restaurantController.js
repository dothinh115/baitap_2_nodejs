const { sequelize, conn } = require("../models/index");
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

    //Không thực hiện dc
    // const checkIfLiked = await model.like_res.findOne({
    //   where: {
    //     user_id: user_id,
    //     res_id: res_id,
    //   },
    // });
    // if (checkIfLiked) {
    //   res
    //     .status(400)
    //     .send(
    // `LỖI: ${user_name.full_name} đã like ${res_name.res_name} rồi!`
    // );
    // } else {
    //   const newLike = {
    //     user_id,
    //     res_id,
    //     date_like: new Date(),
    //   };
    //   await model.like_res.create(newLike);
    //   res
    //     .status(200)
    //     .send(
    // `${user_name.full_name} đã like ${res_name.res_name} thành công!`
    // );
    // }

    const checkIfLikedSql = `SELECT * FROM like_res WHERE user_id = ${user_id} AND res_id = ${res_id} LIMIT 1`;
    conn.query(checkIfLikedSql, async (error, result) => {
      if (result.length === 0) {
        const addNewLikeSql = `INSERT INTO like_res (user_id, res_id, date_like) VALUES (${user_id}, ${res_id}, "2008-10-29 14:56:59")`;
        await conn.promise().query(addNewLikeSql);
        res
          .status(200)
          .send(
            `${user_name.full_name} đã like ${res_name.res_name} thành công!`
          );
      } else {
        res
          .status(400)
          .send(
            `LỖI: ${user_name.full_name} đã like ${res_name.res_name} rồi!`
          );
      }
    });
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
    const newLike = {
      user_id,
      res_id,
      date_like: new Date(),
    };

    const checkIfLikedSql = `SELECT * FROM like_res WHERE user_id = ${user_id} AND res_id = ${res_id} LIMIT 1`;
    conn.query(checkIfLikedSql, async (error, result) => {
      if (result.length === 0) {
        res
          .status(400)
          .send(`LỖI: ${user_name.full_name} chưa like ${res_name.res_name}`);
      } else {
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
      }
    });
  } catch (error) {
    res.status(500).send("Lỗi backend");
  }
};

const getLikedRes = async (req, res) => {
  try {
    const { user_id } = req.params;
    const getLikedResSql = `SELECT res_name FROM restaurant INNER JOIN like_res ON restaurant.res_id = like_res.res_id AND user_id = ${user_id}`;
    const user_name = await model.users.findOne({
      where: {
        user_id,
      },
    });
    conn.query(getLikedResSql, (error, result) => {
      if (result.length === 0)
        res.status(400).send(user_name.full_name + " chưa like nhà hàng nào!");
      else res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send("Lỗi backend");
  }
};

module.exports = {
  getAllRes,
  likeRes,
  unLikeRes,
  getLikedRes,
};
