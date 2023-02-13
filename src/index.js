console.log(__dirname); // trả về đường dẫn của file đang đứng hiện tại
console.log(process.cwd()); //trả về đường dẫn gốc của thư mục
const fs = require("fs"); // => file system, giúp thao tác với các file trên hệ thống
fs.writeFile(process.cwd() + "/test.txt", "Hello world", (err) => {});

//commonjs module  => import
const express = require("express");
const cors = require("cors");
const rootRoute = require("./routes/rootRoute");
//gán lại hàm cho biến mới
const app = express();

//cho phép express đọc chuỗi json
app.use(express.json());
app.use(cors());
//yarn add cors
//khởi tạo server bằng Express
//port: địa chỉ định danh server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});

app.use("/api", rootRoute);

// console.log("hello");

// //khởi tạoh phương thức trả về cho FE
// //tham số truyền vào là rest parameter, thứ 1 là path(string), thứ 2 là 1 hàm, hàm nhận vào 2 tham số (req, res)
// //Method:
// app.get("/demo/:id", (req, res) => {
//   //Nhận dữ liệu từ FE
//   //params: ngăn cách bằng dấu /
//   //query: ?id= (ko cần khai báo ở params)
//   const id = req.params.id;
//   //   const id = req.query.id;

//   //body

//   //Trả dữ liệu về cho FE
//   //có thể trả string, object, array, boolean
//   //ko trả đc number
//   /* STATUS CODE */
//   res.status(201).send(id);
// });

// app.post("/demo", (req, res) => {
//   const { id, password } = req.body;
//   //headers: req.headers
//   res.send({ id });
// });
// // app.put();
// // app.put();
// // app.delete();

// const mysql = require("mysql2");

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   port: 3306,
//   database: "baitap_1_nodejs",
// });

// app.get("/user/:keyWords", async (req, res) => {
//   const { keyWords } = req.params;
//   const sql = `SELECT * FROM food WHERE food_name LIKE '%${keyWords}%'`;

//   //   const data = conn.query(sql, (req, res => {
//   //     res.send(result)
//   //   }));
//   const data = await conn.promise().query(sql);
//   res.send(data[0]);
// });

/* STATUS CODE
200: Thành công
400: Lỗi FE, lỗi BE
500: lỗi BE
 */
