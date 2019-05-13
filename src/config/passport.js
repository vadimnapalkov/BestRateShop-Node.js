import passport from "passport";
import passport_vkontakte from "passport-vkontakte";
const VKontakteStrategy = passport_vkontakte.Strategy;
import User from "../controllers/user";
import config from "./app.config";

passport.use(
  new VKontakteStrategy(
    {
      clientID: config.vkId,
      clientSecret: config.vkSecret,
      callbackURL: config.Domain + "/auth/vkontakte/callback"
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
