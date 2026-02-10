const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getHistory } = require("../controllers/userController");

router.get("/history", auth, getHistory);

module.exports = router;
