var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cors = require('cors')

require('./routes/auth/autnetificate')
require('./routes/auth/JwtStrategy')
require('./routes/auth/LocalStrategy')
const passport = require('passport')
const bodyParser = require("body-parser");
const cookieparser = require('cookie-parser')

const port = 8080;

var app = express();

app.use(bodyParser.json())
app.use(cookieparser("secret"))
app.use(cors())
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(passport.initialize())
app.use("/api/users", usersRouter);


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
app.listen(3000)
module.exports = app;
