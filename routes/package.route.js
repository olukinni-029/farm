const express = require("express");
const {
  createPackage,
  findAllPackage,
  getPackage,
} = require("../controller/package.controller");

const router = express.Router();

router.post("/farm", createPackage);
router.get("/", findAllPackage);
router.get("/:id", getPackage);

module.exports = router;
