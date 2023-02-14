const express = require("express");
const {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  signUp,
  signIn,
} = require("../controllers/userController");
const userRoute = express.Router();

const multer = require("multer");
const { verifyToken } = require("../utils/jwtoken");
// const upload = multer({ dest: `${process.cwd()}/public/img` });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/public/img`);
  },
  filename: (req, file, cb) => {
    const d = new Date();
    const newName = d.getTime() + "_" + file.originalname;
    cb(null, newName);
  },
});
const upload = multer({ storage });
userRoute.post("/upload", upload.single("image"), (req, res) => {
  const fs = require("fs");
  fs.readFile(
    process.cwd() + "/public/img/" + req.file.filename,
    (err, data) => {
      const fileName = `data:${req.file.mimetype};base64,${Buffer.from(
        data
      ).toString("base64")}`;
      //xoa hinh vua up
      fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
      res.send(fileName);
    }
  );
});

//Tạo api
userRoute.get("/getAllUsers", getAllUsers);

userRoute.get("/getUser/:id", getUser);

userRoute.post("/createUser", createUser);

userRoute.delete("/deleteUser/:id", verifyToken, deleteUser);

userRoute.put("/updateUser/:id", updateUser);

userRoute.post("/signUp", signUp);

userRoute.get("/signIn", signIn);

module.exports = userRoute;
