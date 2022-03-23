var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var multer = require("multer");

var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var commentsRouter = require("./routes/comments");
var conversationRouter = require("./routes/conversations");
var messageRouter = require("./routes/messages");
var passport = require("passport");
var path = require("path");
var cookieParser = require("cookie-parser");
var usersRouter = require("./routes/users");

require("./routes/auth/autnetificate");
require("./routes/auth/JwtStrategy");
require("./routes/auth/LocalStrategy");

var app = express();

app.use(bodyParser.json());
app.use(cookieParser("secret"));
app.use(cors());
mongoose.connect(
  "mongodb://localhost:27017/socialmarketingpi",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB !")
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);
app.use("/api/users", usersRouter);

app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
