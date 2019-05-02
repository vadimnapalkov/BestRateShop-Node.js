const passport = require("passport");
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const User = require("../controllers/user");
const config = require("./index");

passport.use(
  new VKontakteStrategy(
    {
      clientID: config.vkId,
      clientSecret: config.vkSecret,
      callbackURL: "http://" + config.Domain + "/auth/vkontakte/callback"
    },
    (accessToken, refreshToken, params, profile, done) => {
      User.createUserByVk(
        profile.id,
        profile.displayName,
        profile.photos[0].value
      )
        .then(([user, created]) => {
          done(null, user);
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
      done(null, user);
    })
    .catch(done);
});
