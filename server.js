// 🔥 Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS configuration (safe + dev friendly)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);


app.use(express.json());

// 🔍 Debug ENV
console.log(
  "GEMINI KEY:",
  process.env.GEMINI_API_KEY ? "LOADED" : "MISSING"
);

// ✅ Routes
app.use("/api/music", require("./routes/musicRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// ✅ Default test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// ✅ Use dynamic port for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});


