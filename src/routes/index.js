var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send(
    'Welcome to my project managemnet service! you can go to "api/v1/docs" to get started.'
  );
});

module.exports = router;
