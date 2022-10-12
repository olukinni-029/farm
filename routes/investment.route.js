const express = require('express');
// const isAuth = require('../middleware/isAuth');

const { createInvestment } = require('../controller/investment.controller');

const router = express.Router();


router.post('/:userId/:id',createInvestment);

module.exports = router;