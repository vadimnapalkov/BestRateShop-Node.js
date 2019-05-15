import passport from "passport";
import passport_vkontakte from "passport-vkontakte";
import LocalStrategy from "passport-local";
import User from "../controllers/user";
import config from "./app.config";

const VKontakteStrategy = passport_vkontakte.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[name]",
      passwordField: "user[password]"
    },
    (name, password, done) => {
      User.getByName(name).then(user => {
        if (user.length == 0) {
          return done(null, false);
        }
        User.validatePassword(password, user[0].hash, user[0].salt).then(
          validate => {
            if (!validate) {
              return done(null, false);
            }
            return done(null, user[0]);
          }
        );
      });
    }
  )
);

passport.use(
  new VKontakteStrategy(
    {
      clientID: config.vkId,
      clientSecret: config.vkSecret,
      callbackURL: config.domain + "/auth/vkontakte/callback"
    },
    (accessToken, refreshToken, params, profile, done) => {
      User.createUserByVk(
        profile.id,
        profile.displayName,
        profile.photos[0].value
      )
        .then(([user, created]) => {
          return done(null, user);
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      return done(null, user);
    })
    .catch(done);
});

export const authenticationUserByPassport = req =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "local",
      { session: true },
      (err, passportUser, info) => {
        if (err) reject(err);
        req.logIn(passportUser, () => {
          resolve({ passportUser, info });
        });
      }
    )(req);
  });
