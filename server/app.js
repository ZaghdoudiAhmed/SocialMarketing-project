var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var DonationRouter = require('./routers/Donation');
var CompaignRouter = require('./routers/Campaign');
var blogRouter = require('./routers/Blog');
var indexRouter = require("./routers/index");
var usersRouter = require("./routers/users");
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


const cors = require('cors');
const bodyparser = require('body-parser');

const port = 8080;



mongoose.connect(
  "mongodb://localhost:27017/mydb",
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

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());
app.use(bodyparser.json({limit: "10mb"}));
app.use(bodyparser.urlencoded({limit: "10mb", extended: true}));
app.use(express.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/',DonationRouter);
app.use('/',blogRouter);
app.use('/',CompaignRouter);
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
