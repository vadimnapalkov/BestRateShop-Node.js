var createError = require("http-errors");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
var bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const schema = require("./graphql/schema");

server.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});

app.use(cors());
app.options(config.corsDomain, cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
