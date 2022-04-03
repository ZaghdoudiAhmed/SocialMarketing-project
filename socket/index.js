const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3002",
  },
});

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
io.on("connection", (socket) => {
  console.log("a user connected.");

  ///////real time messaging ////////

  //take userId and socketId from user
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  ///////real time notification //////

  socket.on("sendNotification", ({ senderId, receiverId, text }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getNotification", {
      senderId,
      receiverId,
      text,
    });
  });

  ////////////////////////////////////////
  socket.on("sendText", ({ senderId, senderName, receiverId, text }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getText", {
      senderId,
      senderName,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
