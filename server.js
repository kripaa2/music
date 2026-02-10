// 🔥 LOAD ENV FIRST (TOP OF FILE)
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔍 DEBUG (TEMP – KEEP FOR NOW)
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY ? "LOADED" : "MISSING");

// routes
app.use("/api/music", require("./routes/musicRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
