const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { explainLyrics } = require("../controllers/aiController");

router.post("/explain", auth, explainLyrics);

module.exports = router;
