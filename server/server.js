const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
//passport middleware

//app.use(passport.initialize());

// Set up Mongoose

const CONNECTION_URL =
  "mongodb+srv://ahmed:ahmed@cluster0.kffsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
//mongoose.connect(isDev ? config.db_dev : config.db);
//mongoose.Promise = global.Promise;
mongoose
  .connect(CONNECTION_URL, {
    useNewurlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, "0.0.0.0", (err) => {
      if (err) {
        console.log(err);
      }

      console.info(">>> 🌎 Open http://0.0.0.0:%s/ in your browser.", PORT);
    })
  );
