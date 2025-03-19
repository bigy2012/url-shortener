require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");
const path = require("path");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// สร้าง Schema URL
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String
});
const Url = mongoose.model("Url", urlSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const hash = crypto.createHash("md5").update(originalUrl).digest("hex");

  const shortUrl = hash.slice(0, 6);
  let existingUrl = await Url.findOne({ shortUrl });
  if (existingUrl) return res.json({ originalUrl: existingUrl.originalUrl, shortUrl: `https://www.youtube.com/${existingUrl.shortUrl}` });

  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();

  res.json({ originalUrl, originalUrl: `https://www.youtube.com/${shortUrl}` });
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const urlData = await Url.findOne({ shortUrl });

  if (urlData) {
    res.redirect(urlData.originalUrl); // ทำการ Redirect ไปที่ URL ต้นฉบับ
  } else {
    res.status(404).json({ error: "URL Not Found" });
  }
});

// เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
