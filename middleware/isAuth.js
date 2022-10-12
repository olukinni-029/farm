const isAuth = (req, res, next) => {
  if (req.user) {
    console.log('============================', req.user);
    next();
  } else {
 //  redirect to login page
     res.render('login');
   }
  };

module.exports = isAuth