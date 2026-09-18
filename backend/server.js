require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { UniqueConstraintError } = require("sequelize");

const sequelize = require("./config/database");

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// Employee routes
app.use("/api/employees", require("./routes/employeeRoutes"));

const frontendPath = path.join(__dirname, "../frontend/dist/frontend/browser");

app.use(express.static(frontendPath));

// Route not found
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: error.errors.map((item) => item.message).join(", "),
    });
  }

  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      message: "Email must be unique.",
    });
  }

  res.status(500).json({
    message: "Internal server error.",
  });
});

// Start server
async function start() {
  try {
    await sequelize.authenticate();

    console.log("Database connection established.");

    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    process.exit(1);
  }
}

start();
