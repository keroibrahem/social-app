const express = require("express");
const router = express.Router();
const { upload, uploadImage, deleteImage } = require("../services/cloudinary.service");

router.post("/", upload.single("image"), uploadImage);

router.delete("/:id", deleteImage);

module.exports = router;