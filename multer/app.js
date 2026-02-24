const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { log } = require("console");

const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // save in public/images
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      const uniqueName =
        bytes.toString("hex") + path.extname(file.originalname);
      cb(null, uniqueName);
    });
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
  res.render("index", {
    image: `/images/${req.file.filename}`,
  });
  console.log(req.file);
});

// Start Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
