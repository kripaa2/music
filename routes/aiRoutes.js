const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

router.post("/transform", aiController.transformLyrics);

module.exports = router;
