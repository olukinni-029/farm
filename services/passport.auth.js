const passport = require("passport");
const db = require("../model");

 const User = db.user;


const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
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
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => { 
      const existingUser = await User.findOne({
        where: {
          googleId: profile.id,
        },
      });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
        name: profile.displayName,
        picture: profile._json.picture,
      }).create();
      done(null, user);
    } 
  )
);
