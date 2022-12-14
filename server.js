require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
require("./services/passport.auth");
const authRoutes = require("./routes/route.js");
const cookiesSession = require("cookie-session");
const passport = require("passport");
const profileRoutes = require("./routes/profile.route");
const packageRoutes = require("./routes/package.route");
const investRoutes = require("./routes/investment.route");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

// connect to db
const db = require("./model");
// const isAuth = require("./middleware/isAuth");
app.use(
  cookiesSession({
    // name: 'google-auth-session',
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

db.sequelize
  .sync()
  .then(() => {
    console.log("Drop and Resync Db");
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    jwt.sign(
      { user: req.user },
      "secretKey",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.json({
            token: null,
          });
        }
        res.json({
          token,
        });
      }
    );
  }
);

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/packages", packageRoutes);
app.use("/invest", investRoutes);

app.get("/uploadPackage", (req, res) => {
  res.render("uploadPackage");
});

app.get("/", (req, res) => {
  console.log(req.user);
  res.render("home", { user: req.user });
});

const port = process.env.PORT || 2670;

app.listen(port, () => {
  console.log(`Server is .running on http://localhost:${port}.`);
});
