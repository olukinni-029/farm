const router =require('express').Router();
const db = require('../model/index');
const User = db.user;

// const authCheck=(req,res,next) => {
//     if(!req.user){
//       res.redirect('/auth/login');
//     }else{
//         next();
//     }
// };

router.get('/',(req,res) =>{
    const user = User.findOne().exec((err,result)=>{
      if(result) 
      res.render('profile', {data: result})

    });
});


module.exports = router