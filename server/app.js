var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var multer = require("multer");

var mongoose = require("mongoose");
var DonationRouter = require('./routers/Donation');
var CompaignRouter = require('./routers/Campaign');
var blogRouter = require('./routers/Blog');
var indexRouter = require("./routers/index");
var usersRouter = require("./routers/users");g
var app = express();
const http = require('http').Server(app)
http.listen(2600);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(http, {
  debug: true,
});

app.use("/peerjs", peerServer);

const io = require('socket.io')(http, { cors: {origin:'*'}});



io.on('connection', (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {

    socket.join(roomId);
    console.log(userId)
    socket.broadcast.to(roomId).emit("user-connected", userId);

socket.on("message", (message) => {
      io.in(roomId).emit("createMessage", message, userName);
    });
 socket.on('disconnect',()=>{
  socket.broadcast.to(roomId).emit('user-disconnected', userId)
 });
    });

socket.on('chat',(msg)=>{
    io.emit('new message',msg)

})
  });

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the A

// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});
  
const cors = require('cors');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload')
var indexRouter = require("./routers/index");
var usersRouter = require("./routers/users");

//configuration la cnx à la base
var mongoose = require('mongoose');
//const port = 8080;
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var commentsRouter = require("./routes/comments");
var conversationRouter = require("./routes/conversations");
var messageRouter = require("./routes/messages");
var notificationRouter = require("./routes/notifications");

var passport = require("passport");
var path = require("path");
var cookieParser = require("cookie-parser");
var usersRouter = require("./routes/users");

require("./routes/auth/autnetificate");
require("./routes/auth/JwtStrategy");
require("./routes/auth/LocalStrategy");


app.use(bodyParser.json());
app.use(cookieParser("secret"));
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/socialmarketingpi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true
}))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(passport.initialize());


app.use(cors());
app.use(bodyparser.json({limit: "10mb"}));
app.use(bodyparser.urlencoded({limit: "10mb", extended: true}));
app.use(express.json());
g
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/',DonationRouter);
app.use('/',blogRouter);
app.use('/',CompaignRouter);
app.use('/api', require('./routers/categoryRouter'))
app.use('/api', require('./routers/productRouter'))
app.use('/api', require('./routers/filterRouter'))
app.use('/api',require('./routers/paymentRouter'))
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);
app.use("/api/users", usersRouter);
app.use("/notifications", notificationRouter);

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
