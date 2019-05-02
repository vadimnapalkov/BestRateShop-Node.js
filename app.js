const createError = require("http-errors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const bodyParser = require("body-parser");
const Session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const io = require("socket.io").listen(server);
const config = require("./config");
const schema = require("./graphql/schema");

server.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});

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

//  Use graphiql
//  app.use("/api/graphiql", graphiqlExpress({ endpointURL: "/api" }));
app.use(
  "/api",
  bodyParser.json(),
  graphqlExpress(() => ({
    schema,
    debug: config.env === "development"
  }))
);

// oAuth VK
app.get("/auth/vkontakte", passport.authenticate("vkontakte"));
app.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: "http://" + config.Domain + "/",
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
