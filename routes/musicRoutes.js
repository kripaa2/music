const router = require("express").Router();
const auth = require("../middleware/auth");
const { searchSong } = require("../controllers/musicController");

router.get("/search", auth, searchSong);

module.exports = router;
