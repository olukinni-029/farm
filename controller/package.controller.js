const { user } = require("../model/index");
const db = require("../model/index");
const Package = db.package;
const User = db.user;

// // User.hasOne(Package);
// Package.belongsTo(User);

// To create farm packages
exports.createPackage = async (req, res) => {
  try {
    const { packageName, packageLocation, amountUnit, duration } = req.body;
    if (!packageName || !packageLocation || !amountUnit || !duration) {
      res.status(400).send({ message: "content can not be empty" });
      return;
    }

    const checkPackage = await Package.findOne({
      where: { packageName: packageName },
    });
    if (checkPackage) {
      res.status(404).json({ message: "Package already exist" });
    }

    //  only role:admin can post farm package?
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    if (user.role !== "admin") {
      return res.status(401).json({ message: "You are not authorized" });
    }

    const package = await Package.create({
      packageName: req.body.packageName,
      packageLocation: req.body.packageLocation,
      amountUnit: req.body.amountUnit,
      duration: req.body.duration,
    });
    res.status(200).json({ message: "Package successfully created", package });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// To get all package
exports.findAllPackage = (req, res) => {
  // pagination of 10per time of 25 data
  const package = Package.findAll({ limit: 10 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getPackage = async (req, res) => {
  try {
    const id = req.params.id;
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
    const package = await Package.findByPk(id);
    if (!package) {
      res.status(404).send({ message: "Not found package with id " + id });
    } else {
      res.send(package);
    }
  } catch (error) {
    res.status(500).send({
      message: err.message,
    });
  }
};
