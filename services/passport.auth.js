const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../model");
const User = db.user;

passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize the user , just like decode a jwt token
passport.deserializeUser((id, done) => {
   const user = User.findByPk(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://farmpouch.herokuapp.com/auth/google/redirect",
      passReqToCallback: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const existingUser = await User.findByPk({
        where: {
          googleId: profile,
        },
      });
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = await User.create({
          googleId: profile,
          name: profile.displayName,
          picture: profile._json.picture,
          email: profile.email,
        })
        done(null, user);
      }
    }
    )
);
