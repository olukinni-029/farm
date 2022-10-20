const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const db = require("../model");
const User = db.user;
const colors = require('colors')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user , just like decode a jwt token
passport.deserializeUser((id, done) => {
  const user = User .findByPk(id)
  done(null, user);
});
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:2500/auth/google/redirect",
        // passReqToCallback: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const existingUser = await User.findOne({where:{googleId: profile.id}
        });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const user = await User.create({
            method: "google",
            google: {
              googleId: profile.id,
              name: profile.displayName,
              picture: profile._json.picture,
              email: profile.email[0].value,
            },
          });
          console.log(`new user created ${user}`.green);
          done(null, user);
        }
      }
    )
  );


module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(),
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromHeader("authorization"),
          secretOrKey: "secretKey",
        },
        async (jwtPayload, done) => {
          try {
            const user = jwtPayload.user;
            done(null, user);
          } catch (error) {
            done(error, false);
          }
        }
      )
    )
  );
};
