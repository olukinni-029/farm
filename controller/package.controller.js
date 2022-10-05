const db = require('../model/index');
const Package = db.package; 
const User = db.user;

// To create farm packages
exports.createPackage = async(req,res)=>{
    try {
        const {packageName,packageLocation,amountUnit,duration} = req.body;
        if(!packageName || !packageLocation || !amountUnit || !duration){
            res.status(400).send({message:"content can not be empty"});
            return;
        };
        //  only role:admin can post farm package?
    const id = req.user.id;
    const user = await User.findOne({where:{id:id}});
    if (user.role !== "admin") {
      return res.status(401).json({ message: "You are not authorized" });
    };

    const package =await Package.create({
     packageName:req.body.packageName,
    packageLocation:req.body.packageLocation,
    amountUnit:req.body.amountUnit,
     duration:req.body.duration
    });
    res.status(200).json({message:'Package successfully created',package});
    } catch (err) {
        res.status(500).send({message:err.message});

    }
};


// To get all package
exports.findAllPackage =(req,res)=>{

    const package =Package.findAll()
    .then(data=>{
        // pagination of 10per time of 25 data
       
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message});
    });
};


// endpoint to make package payment using flutterwave payment api?    







