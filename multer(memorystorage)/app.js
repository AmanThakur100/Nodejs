const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// 🧠 Memory Storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.send("No file uploaded");
  }

  // Create unique filename
  const fileName = Date.now() + "-" + req.file.originalname;

  // Path where file will be saved
  const filePath = path.join(__dirname, "public/images", fileName);

  // Manually save file from buffer
  fs.writeFileSync(filePath, req.file.buffer);

  res.render("index", {
    image: `/images/${fileName}`,
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
