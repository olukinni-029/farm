const db = require("../model");
const Package = db.package;
const Investment = db.investment;
const User = db.user;

// User.hasOne(Package);
// Package.belongsTo(User);



exports.createInvestment = async (req, res) => {
  try {
    const { quantity,totalAmount} = req.body;
    if (!quantity) {
      return res.status(404).json({ message: "content cant be empty" });
    }
    const id = req.params.userId;
    const checkUser = await User.findByPk(id);
    if (!checkUser){
       res.status(404).json({ message: "user doesn't exists"})
    }
     const amountUnit = Package.amountUnit;
    const investment = await Investment.create({
      quantity,
      totalAmount:quantity*amountUnit,
    });
    res
      .status(200)
      .json({ message: "Investment successfully created", investment });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};



