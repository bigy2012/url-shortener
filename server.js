require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// สร้าง Schema URL
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});
const Url = mongoose.model("Url", urlSchema);

// API: สร้าง URL สั้น
app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = nanoid(6); // สร้างโค้ดสั้น 6 ตัวอักษร
  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();
  res.json({ originalUrl, shortUrl });
});

// API: เรียก URL ยาวจากโค้ดสั้น
app.get("/:shortUrl", async (req, res) => {
  const url = await Url.findOne({ shortUrl: req.params.shortUrl });
  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

// เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
