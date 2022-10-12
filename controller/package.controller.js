const db = require("../model/index");
const Package = db.package;
const User = db.user;

//  User.hasOne(Package);
//  Package.belongsTo(User);

// To create farm packages
exports.createPackage = async (req, res) => {
  try {
    console.log(req.user);
    //check if user is an admin
    const user = await User.findByPk({
      
        id: req.userId,
      
    });
    console.log(user);
    if (user.role !== 'admin') {
      return res.status(403).send({
        message: 'Require Admin Role!',
      });
    }

    // if user is an admin
    // Create a Package
    const package = {
      packageName: req.body.packageName,
      packageLocation: req.body.packageLocation,
      amountUnit: req.body.amountUnit,
      duration: req.body.duration,
    };

    // Save Package in the database
    const savePackage = await Package.create(package);
    res.send(savePackage);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating the Package.',
    });
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
    const package = await Package.findByPk(id);
    if (!package) {
      res.status(404).json({ message: "Not Available " + id });
    } else {
      res.status(200).json({message:"Available ",package});
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
