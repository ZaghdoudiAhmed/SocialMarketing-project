require("dotenv").config();
const express = require("express");
const app = express();
var router = express.Router();

const User = require("../models/user");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("./auth/autnetificate");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
//confirm email
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "elyes.akkari@esprit.tn",
    pass: process.env.EMAILSECRET,
  },
});
//test
router.post("/mail", (req, res) => {
  console.log(req.body.code);
  User.findById(req.body.id).then((user) => {
    user.confirmation = { code: req.body.code, date: new Date() };
    user.save();
  });

  var mailOptions = {
    from: "elyes.akkari@esprit.tn",
    to: "mihite2289@tonaeto.com",
    subject: "Welcome to 2nd Chance. Please verify your Account!",
    //text: 'That was easy!'+req.body.code
    html:
      "<html>\n" +
      "\n" +
      "<head>\n" +
      "    <title></title>\n" +
      '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
      '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n' +
      '    <style type="text/css">\n' +
      "        @media screen {\n" +
      "            @font-face {\n" +
      "                font-family: 'Lato';\n" +
      "                font-style: normal;\n" +
      "                font-weight: 400;\n" +
      "                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');\n" +
      "            }\n" +
      "\n" +
      "            @font-face {\n" +
      "                font-family: 'Lato';\n" +
      "                font-style: normal;\n" +
      "                font-weight: 700;\n" +
      "                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');\n" +
      "            }\n" +
      "\n" +
      "            @font-face {\n" +
      "                font-family: 'Lato';\n" +
      "                font-style: italic;\n" +
      "                font-weight: 400;\n" +
      "                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');\n" +
      "            }\n" +
      "\n" +
      "            @font-face {\n" +
      "                font-family: 'Lato';\n" +
      "                font-style: italic;\n" +
      "                font-weight: 700;\n" +
      "                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');\n" +
      "            }\n" +
      "        }\n" +
      "\n" +
      "        /* CLIENT-SPECIFIC STYLES */\n" +
      "        body,\n" +
      "        table,\n" +
      "        td,\n" +
      "        a {\n" +
      "            -webkit-text-size-adjust: 100%;\n" +
      "            -ms-text-size-adjust: 100%;\n" +
      "        }\n" +
      "\n" +
      "        table,\n" +
      "        td {\n" +
      "            mso-table-lspace: 0pt;\n" +
      "            mso-table-rspace: 0pt;\n" +
      "        }\n" +
      "\n" +
      "        img {\n" +
      "            -ms-interpolation-mode: bicubic;\n" +
      "        }\n" +
      "\n" +
      "        /* RESET STYLES */\n" +
      "        img {\n" +
      "            border: 0;\n" +
      "            height: auto;\n" +
      "            line-height: 100%;\n" +
      "            outline: none;\n" +
      "            text-decoration: none;\n" +
      "        }\n" +
      "\n" +
      "        table {\n" +
      "            border-collapse: collapse !important;\n" +
      "        }\n" +
      "\n" +
      "        body {\n" +
      "            height: 100% !important;\n" +
      "            margin: 0 !important;\n" +
      "            padding: 0 !important;\n" +
      "            width: 100% !important;\n" +
      "        }\n" +
      "\n" +
      "        /* iOS BLUE LINKS */\n" +
      "        a[x-apple-data-detectors] {\n" +
      "            color: inherit !important;\n" +
      "            text-decoration: none !important;\n" +
      "            font-size: inherit !important;\n" +
      "            font-family: inherit !important;\n" +
      "            font-weight: inherit !important;\n" +
      "            line-height: inherit !important;\n" +
      "        }\n" +
      "\n" +
      "        /* MOBILE STYLES */\n" +
      "        @media screen and (max-width:600px) {\n" +
      "            h1 {\n" +
      "                font-size: 32px !important;\n" +
      "                line-height: 32px !important;\n" +
      "            }\n" +
      "        }\n" +
      "\n" +
      "        /* ANDROID CENTER FIX */\n" +
      '        div[style*="margin: 16px 0;"] {\n' +
      "            margin: 0 !important;\n" +
      "        }\n" +
      "    </style>\n" +
      "</head>\n" +
      "\n" +
      '<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">\n' +
      "    <!-- HIDDEN PREHEADER TEXT -->\n" +
      "    <div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\"> We're thrilled to have you here! Get ready to dive into your new account. </div>\n" +
      '    <table border="0" cellpadding="0" cellspacing="0" width="100%">\n' +
      "        <!-- LOGO -->\n" +
      "        <tr>\n" +
      '            <td bgcolor="#FFA73B" align="center">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
      "                    <tr>\n" +
      '                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>\n' +
      "                    </tr>\n" +
      "                </table>\n" +
      "            </td>\n" +
      "        </tr>\n" +
      "        <tr>\n" +
      '            <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
      "                    <tr>\n" +
      '                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">\n' +
      '                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />\n' +
      "                        </td>\n" +
      "                    </tr>\n" +
      "                </table>\n" +
      "            </td>\n" +
      "        </tr>\n" +
      "        <tr>\n" +
      '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
      "                    <tr>\n" +
      '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
      '                            <p style="margin: 0;">We\'re excited to have you get started. First, you need to confirm your account. Just copy and past the code below.</p>\n' +
      "                        </td>\n" +
      "                    </tr>\n" +
      "                    <tr>\n" +
      '                        <td bgcolor="#ffffff" align="left">\n' +
      '                            <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
      "                                <tr>\n" +
      '                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">\n' +
      '                                        <table border="0" cellspacing="0" cellpadding="0">\n' +
      "                                            <tr>\n" +
      '                                                <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="#" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;" readonly>' +
      req.body.code +
      "</a></td>\n" +
      "                                            </tr>\n" +
      "                                        </table>\n" +
      "                                    </td>\n" +
      "                                </tr>\n" +
      "                            </table>\n" +
      "                        </td>\n" +
      "                    </tr> <!-- COPY -->\n" +
      "                    <tr>\n" +
      '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
      '                            <p style="margin: 0;">If that doesn\'t work, it means the code had expired. Please try again.</p>\n' +
      "                        </td>\n" +
      "                    </tr> <!-- COPY -->\n" +
      "                    <tr>\n" +
      '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
      '                            <p style="margin: 0;">If you have any questions, just reply to this email—we\'re always happy to help out.</p>\n' +
      "                        </td>\n" +
      "                    </tr>\n" +
      "                    <tr>\n" +
      '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
      '                            <p style="margin: 0;">Cheers,<br>2nd CHANCE Team</p>\n' +
      "                        </td>\n" +
      "                    </tr>\n" +
      "                </table>\n" +
      "            </td>\n" +
      "        </tr>\n" +
      "        <tr>\n" +
      '            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
      "                    <tr>\n" +
      '                        <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
      '                            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>\n' +
      '                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>\n' +
      "                        </td>\n" +
      "                    </tr>\n" +
      "                </table>\n" +
      "            </td>\n" +
      "        </tr>\n" +
      "        <tr>\n" +
      '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
      "                    <tr>\n" +
      '                        <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>\n' +
      '                            <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>\n' +
      "                        </td>\n" +
      "                    </tr>\n" +
      "                </table>\n" +
      "            </td>\n" +
      "        </tr>\n" +
      "    </table>\n" +
      "</body>\n" +
      "\n" +
      "</html>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.status(200);
  res.send("mail sent");
});
//app.use(cors)
app.use(express.json());
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//register
router.post("/register", async (req, res) => {
  User.register(
    new User({ email: req.body.email }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
      } else {
        user.name = req.body.name;
        user.gender = req.body.gender;
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.statusCode = 201;
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.send({ success: true, token });
          }
        });
      }
    }
  );
});

app.use(express.json());

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      console.log(user);
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token: token, id: user._id });
        }
      });
    },
    (err) => next(err)
  );
});

router.post("/update", upload.single("image"), async (req, res) => {
  console.log(req.file.filename);
  console.log(req.body.email);

  User.findOne({ email: req.body.email }).then((user) => {
    user.profilepic.push(req.file.filename);
    user.save();
  });
});

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, "secretRefresh");
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );
            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (e) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});

router.post("/me", (req, res, next) => {
  User.findById(req.body.currentUserId).then(
    (user) => {
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.send({ user: user });
        }
      });
    },
    (err) => next(err)
  );
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );
      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
  localStorage.clear();
});

router.post("/verifyEmail", (req, res) => {
  console.log(req.body.id + " / " + req.body.verif);
  User.findById(req.body.id).then((user) => {
    console.log(user.confirmation.code);
    console.log("___________");
    console.log();
    if (
      user.confirmation.code === req.body.verif &&
      (new Date() - user.confirmation.date) / 60000 < 2
    ) {
      user.verified = true;
      user.save();
      console.log("success verif");
      res.send({ success: true });
    } else {
      console.log("fail verif");
      res.send({ success: false });
    }
  });
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    res.json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a user
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
