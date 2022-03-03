const router = require("express").Router();

router.get("/test", function (req, res) {
  console.log("test");
  res.json({ test: "Hi!!" });
});

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
