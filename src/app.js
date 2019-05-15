import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import Session from "express-session";
import passport from "passport";
import cors from "cors";
import config from "./config/app.config";
import schema from "./graphql/schema";
import models from "./models";
import connect_session_sequelize from "connect-session-sequelize";
import userRouter from "./routes/user";

const SequelizeStore = connect_session_sequelize(Session.Store);
const app = express();
const myStore = new SequelizeStore({
  db: models.sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 2 * 60 * 60 * 1000
});

app.use(cors({ origin: config.corsDomain, credentials: true }));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  Session({
    secret: "LKJHuBbuiboIUBP09Ipojk",
    store: myStore,
    saveUninitialized: true,
    resave: false,
    proxy: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
myStore.sync();

// oAuth VK
app.get("/auth/vkontakte", passport.authenticate("vkontakte"));
app.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: config.frontDomain + "/",
    failureRedirect: config.frontDomain + "/login"
  })
);

app.get("/session/user", userRouter.session);
app.get("/session/logout", userRouter.destroySession);

const serverApollo = new ApolloServer({
  schema,
  playground: config.env === "development",
  context: ({ req, res }) => ({ req, res })
});
serverApollo.applyMiddleware({ app, path: "/api", cors: false });

//Error Not Found
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen({ port: config.port }, () => {
  console.log(`Example app listening on port ${config.port}!`);
});
