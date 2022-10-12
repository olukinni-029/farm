const express = require("express");
 const isAuth = require('../middleware/isAuth');

const {
  createPackage,
  findAllPackage,
  getPackage,
} = require("../controller/package.controller");

const router = express.Router();

router.post("/farm/:userId", createPackage);
router.get("/", findAllPackage);
router.get("/:id", getPackage);

module.exports = router;




// app.get('/', isLoggedIn, (req, res) => {
//   try {
//     if (req.user) {
//       const userId  = req.user.id
      
//       const user = await User.findByPk(userId)
//       if(user.role !== "admin"){
//         return res.status(401).json("unauthorized")
//       }
      
//       const create_new_package = await Package.create({
//         userId: user.id,
//         item:
//       })
//       console.log('============================');
//       console.log('============================');
//       console.log('logged in user', r
