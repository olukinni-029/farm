const express = require('express');
const { createPackage, findAllPackage } = require('../controller/package.controller');



const router = express.Router();


router.post('/',createPackage);
router.get('/',findAllPackage);

module.exports = router;