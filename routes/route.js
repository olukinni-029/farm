const router = require('express').Router();
const passport = require('passport');

const db = require('../model/index');
const User = db.user;

router.get('/login',(req,res)=>{
    res.render('login')
});


router.get('/logout',(req,res)=>{
    res.send('logging out');
})


router.get('/google',
  passport.authenticate('google',{
     scope: ['profile'],
   }));

// users signing in with google accounts
router.get(
   '/google/redirect',
   passport.authenticate('google'),
   (req, res) => {
    res.redirect('/profile');
    //  res.send(req.user);
    });


    // admin route
    router.post('/create',async(req,res)=>{
        try {
            const{name,email,role}=req.body;
            if(!name||!email||!role){
                res.status(400).send({message:"content can not be empty"});
                return;
            }
            const checkUser = await User.findOne({
                where: {
                    email: req.body.email,
                  },
          
            });
            if (!checkUser){
              return res.status(404).json({
                    message: "user doesn't exists",
                })
            }
            const user =await User.create({
                name,
                email,
                role,
            })
            return res.status(200).json({ message: "User created successfully", user });
        } catch (err) {
            res.status(500).send({message:err.message});

        }
    });

module.exports = router;