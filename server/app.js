var createError = require("http-errors");
var express = require("express");

var path = require("path");

var logger = require("morgan");

var mongoose = require("mongoose");
var DonationRouter = require('./routers/Donation');
var CompaignRouter = require('./routers/Campaign');
var blogRouter = require('./routers/Blog');
var usersRouter = require("./routers/users");
var adsRouter= require('./routers/Ad')
var kmeansRouter = require('./routers/data-mining/kmeans')
var app = express();

const http = require("http").Server(app);
const httpd = require("http").Server(app);
http.listen(2600);
httpd.listen(2700);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(http, {
  debug: true,
});

app.use("/peerjs", peerServer);

const io = require("socket.io")(http, { cors: { origin: "*" } });
const iooo = require("socket.io")(httpd, { cors: { origin: "*" } });
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//when ceonnect
iooo.on("connection", (socket) => {
  console.log("a user connected.");

  ///////real time messaging ////////

  //take userId and socketId from user
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    iooo.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(user);
    iooo.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  ///////real time notification //////

  socket.on("sendNotification", ({ senderId, receiverId, text }) => {
    const receiver = getUser(receiverId);
    console.log(users);
    iooo.to(receiver?.socketId).emit("getNotification", {
      senderId,
      receiverId,
      text,
    });
  });

  ////////////////////////////////////////
  socket.on("sendText", ({ senderId, senderName, receiverId, text }) => {
    const receiver = getUser(receiverId);
    iooo.to(receiver?.userId).emit("getText", {
      senderId,
      senderName,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    iooo.emit("getUsers", users);
  });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    console.log(userId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("message", (message) => {
      io.in(roomId).emit("createMessage", message, userName);
    });
    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });

  socket.on("chat", (msg) => {
    io.emit("new message", msg);
  });
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the A

  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});


const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");

//configuration la cnx à la base
var mongoose = require("mongoose");
//const port = 8080;
var usersRouter = require("./routers/users");

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
app.use(cors());
app.use(bodyparser.json())
var postsRouter = require("./routers/posts");
var commentsRouter = require("./routers/comments");
var conversationRouter = require("./routers/conversations");
var messageRouter = require("./routers/messages");
var notificationRouter = require("./routers/notifications");
var postsRouter = require("./routers/posts");
var commentsRouter = require("./routers/comments");
var conversationRouter = require("./routers/conversations");
var messageRouter = require("./routers/messages");
var storiesRouter = require("./routers/stories");
var DonationRouter = require("./routers/Donation");
var CompaignRouter = require("./routers/Campaign");
var blogRouter = require("./routers/Blog");

var passport = require("passport");
var path = require("path");
var cookieParser = require("cookie-parser");

require("./routers/auth/autnetificate");
require("./routers/auth/JwtStrategy");
require("./routers/auth/LocalStrategy");

app.use(cookieParser("secret"));
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/socialmarketingpi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cookieParser());

/*app.use(fileUpload({
  useTempFiles: true
}))*/

app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(passport.initialize());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json({ limit: "10mb" }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

/*app.use('/', indexRouter);*/
app.use('/',DonationRouter);
app.use('/',blogRouter);
app.use('/',CompaignRouter);
app.use('/api', require('./routers/categoryRouter'))
app.use('/api', require('./routers/productRouter'))
app.use('/api', require('./routers/filterRouter'))
app.use('/api',require('./routers/paymentRouter'))
app.use("/posts", postsRouter);
app.use("/", DonationRouter);
app.use("/", blogRouter);
app.use("/", CompaignRouter);
app.use("/api", require("./routers/categoryRouter"));
app.use("/api", require("./routers/productRouter"));
app.use("/api", require("./routers/filterRouter"));
app.use("/api", require("./routers/paymentRouter"));
app.use("/comments", commentsRouter);
app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);
app.use("/api/users", usersRouter);
app.use("/ads", adsRouter);
app.use("/dm/kmeans", kmeansRouter)
app.use("/notifications", notificationRouter);
app.use("/stories", storiesRouter);


app.use(express.urlencoded({ extended: true }));
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
