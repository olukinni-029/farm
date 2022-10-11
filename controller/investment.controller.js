const db = require("../model");
const Package = db.package;
const Investment = db.investment;
const User = db.user;

// User.hasOne(Package);
// Package.belongsTo(User);



exports.createInvestment = async (req, res) => {
  try {
    console.log(req.session.passport)
    const { quantity,totalAmount } = req.body;
    if (!quantity) {
      return res.status(404).json({ message: "content cant be empty" });
    }
       const checkUser = await User.findOne({
        where: {
            id: req.param.userId,
          },
    });
    if (checkUser){
      return res.status(404).json({ message: "user profile exists"})
    }else{
         res.status(403).json({message: "user doesn't exists"});
    }
    const checkStatus = await Package.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (checkStatus) {
      return res.send("Available");
    } else {
      res.send("Not Available");
    }
    const investment = await Investment.create({
      quantity,
      totalAmount:(quantity*amountUnit),
    });
    res
      .status(200)
      .json({ message: "Investment successfully created", investment });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Package.findByPk(id)
//   .then(data => {
//     if (!data)
//     else res.send(data);
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .send({ message: "Error retrieving package with id=" + id });
//   });
