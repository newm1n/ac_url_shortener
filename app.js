const express = require("express");
const mongoose = require("mongoose");

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 取得資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

const app = express();
const port = 3000;

// routes setting
app.get("/", (req, res) => {
  res.send("HI");
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
