import createError from "http-errors";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import Session from "express-session";
import passport from "passport";
import cors from "cors";
import socket from "socket.io";
import config from "./config/app.config";
import schema from "./graphql/schema";

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);
const serverApollo = new ApolloServer({
  schema,
  playground: config.env === "development"
});
serverApollo.applyMiddleware({ app, path: "/api" });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.options(config.corsDomain, cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  Session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// oAuth VK
app.get("/auth/vkontakte", passport.authenticate("vkontakte"));
app.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: "http://" + config.domain + "/",
    failureRedirect: "http://" + config.frontDomain + "/login"
  })
);
app.get("/", (req, res) => {
  io.sockets.emit(
    "vkUser",
    JSON.stringify(req.user[0], ["id", "name", "photo"])
  );
  res.render("closePage");
});

//Error Not Found
app.use(function(req, res, next) {
  next(createError(404));
});

server.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});
