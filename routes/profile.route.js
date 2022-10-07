const router =require('express').Router();

// const authCheck=(req,res,next) => {
//     if(!req.user){
//        res.redirect('/auth/');
//    }else{
//        next();
//    }
//  };

router.get('/',(req,res) =>{
      res.render('profile')
      // res.send(req.user);
});


module.exports = router