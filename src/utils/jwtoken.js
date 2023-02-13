const jwt = require("jsonwebtoken");
// tạo token

const createToken = (payload) => {
  const token = jwt.sign({ ...payload }, "nodejs27", { expiresIn: "15m" });
  return token;
};

const checkToken = (token) => {
  const result = jwt.verify(token, "nodejs27");
  return result;
};

const verifyToken = (req, res, next) => {
  try {
    const { token } = req.headers;
    const check = checkToken(token);
    if (check) next(); // đi đến tham số tiếp theo
  } catch (error) {
    res.status(401).send("Không có quyền truy cập");
  }
};

// kiểm tra token

module.exports = {
  createToken,
  checkToken,
  verifyToken,
};
