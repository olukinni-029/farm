const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  console.log(req.user)
  res.render("profile", { user: req.user });
  // res.send(req.user);
});

module.exports = router;
