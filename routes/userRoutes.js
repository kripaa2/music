const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN HIT:", email);

  if (email && password) {
    return res.json({
      success: true,
      token: "test-token"
    });
  }

  res.json({ success: false });
});

module.exports = router;
