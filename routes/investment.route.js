const express = require('express');
const { createInvestment } = require('../controller/investment.controller');

const router = express.Router();


router.post('/',createInvestment);

module.exports = router;