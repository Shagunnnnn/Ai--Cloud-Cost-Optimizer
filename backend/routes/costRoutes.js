const express = require("express");
const router = express.Router();
const { optimize } = require("../controllers/costController");

router.post("/optimize", optimize);

module.exports = router;
