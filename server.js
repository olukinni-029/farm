require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/route.js');
const passportSetup = require('./services/passport.auth.js');
const cookiesSession = require('cookie-session');
 const passport = require('passport');
 const profileRoutes = require('./routes/profile.route');
 const packageRoutes = require('./routes/package.route');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine','ejs');

app.use(
  cookiesSession({
    maxAge: 24 * 60 * 60 * 1000, //24 hrs i.e a day, times 60 minutes in an hr , 60  in a minute, 1000 ms seconds in a second == 1 day in milliseconds
    keys: [process.env.SESSION_KEY],
  })
 );

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/package',packageRoutes);

// connect to db
const db = require("./model/index");
db.sequelize.authenticate().then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

// sync
db.sequelize.sync()

// to force sync during development
//db.sequelize.sync({ force: true }).then(() => {
//console.log("Drop and re-sync db.");
//});

app.use(passport.initialize());
 app.use(passport.session());


app.get('/',(req,res)=>{
res.render('home')
});





const port = process.env.Port || 2670;

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}.`)
});