// Importing Packages
const express = require("express");

// Importing routes
const apiRouter = require("./api");

// Initializing Imported packages ----------
const router = express.Router();

// Routes ---------------
router.use("/api", apiRouter);

// Route Handlers -------------
router.get("/hello/world", function (req, res) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("Hello World!");
});

module.exports = router;
