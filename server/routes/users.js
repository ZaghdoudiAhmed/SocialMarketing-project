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
    cb(null, "../public/uploads/users");
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
const twilio = require("twilio");

const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
//confirm email
const nodemailer = require("nodemailer");
const Process = require("process");
// const {forEach} = require("react-bootstrap/ElementChildren");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILADRESS,
    pass: process.env.EMAILSECRET,
  },
});
//test
router.post("/mail", (req, res) => {
  console.log(req.body.code);
  let mailStr = "";
  User.findById(req.body.id).then((user) => {
    user.confirmation = { code: req.body.code, date: new Date() };
    user.save();
  });
  var mailOptions = {
    from: process.env.EMAILADRESS,
    to: req.body.mail,
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

router.post("/ResetMail", (req, res) => {
  var mailOptions = {
    from: process.env.EMAILADRESS,
    to: req.body.mail,
    subject: "Reset Password",
    //text: 'That was easy!'+req.body.code
    html:
      "<!doctype html>\n" +
      '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n' +
      "\n" +
      "<head>\n" +
      "  <!-- NAME: 1 COLUMN -->\n" +
      "  <!--[if gte mso 15]>\n" +
      "      <xml>\n" +
      "        <o:OfficeDocumentSettings>\n" +
      "          <o:AllowPNG/>\n" +
      "          <o:PixelsPerInch>96</o:PixelsPerInch>\n" +
      "        </o:OfficeDocumentSettings>\n" +
      "      </xml>\n" +
      "    <![endif]-->\n" +
      '  <meta charset="UTF-8">\n' +
      '  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      "  <title>Reset Your Lingo Password</title>\n" +
      "  <!--[if !mso]>\n" +
      "      <!-- -->\n" +
      "  <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>\n" +
      "  <!--<![endif]-->\n" +
      '  <style type="text/css">\n' +
      "    @media only screen and (min-width:768px){\n" +
      "          .templateContainer{\n" +
      "              width:600px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          body,table,td,p,a,li,blockquote{\n" +
      "              -webkit-text-size-adjust:none !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          body{\n" +
      "              width:100% !important;\n" +
      "              min-width:100% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          #bodyCell{\n" +
      "              padding-top:10px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnImage{\n" +
      "              width:100% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "         \n" +
      "   .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{\n" +
      "              max-width:100% !important;\n" +
      "              width:100% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnBoxedTextContentContainer{\n" +
      "              min-width:100% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnImageGroupContent{\n" +
      "              padding:9px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnCaptionLeftContentOuter\n" +
      "   .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{\n" +
      "              padding-top:9px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnImageCardTopImageContent,.mcnCaptionBlockInner\n" +
      "   .mcnCaptionTopContent:last-child .mcnTextContent{\n" +
      "              padding-top:18px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnImageCardBottomImageContent{\n" +
      "              padding-bottom:9px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnImageGroupBlockInner{\n" +
      "              padding-top:0 !important;\n" +
      "              padding-bottom:0 !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnImageGroupBlockOuter{\n" +
      "              padding-top:9px !important;\n" +
      "              padding-bottom:9px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnTextContent,.mcnBoxedTextContentColumn{\n" +
      "              padding-right:18px !important;\n" +
      "              padding-left:18px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{\n" +
      "              padding-right:18px !important;\n" +
      "              padding-bottom:0 !important;\n" +
      "              padding-left:18px !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "          .mcpreview-image-uploader{\n" +
      "              display:none !important;\n" +
      "              width:100% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Heading 1\n" +
      "      @tip Make the first-level headings larger in size for better readability\n" +
      "   on small screens.\n" +
      "      */\n" +
      "          h1{\n" +
      "              /*@editable*/font-size:20px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Heading 2\n" +
      "      @tip Make the second-level headings larger in size for better\n" +
      "   readability on small screens.\n" +
      "      */\n" +
      "          h2{\n" +
      "              /*@editable*/font-size:20px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Heading 3\n" +
      "      @tip Make the third-level headings larger in size for better readability\n" +
      "   on small screens.\n" +
      "      */\n" +
      "          h3{\n" +
      "              /*@editable*/font-size:18px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Heading 4\n" +
      "      @tip Make the fourth-level headings larger in size for better\n" +
      "   readability on small screens.\n" +
      "      */\n" +
      "          h4{\n" +
      "              /*@editable*/font-size:16px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Boxed Text\n" +
      "      @tip Make the boxed text larger in size for better readability on small\n" +
      "   screens. We recommend a font size of at least 16px.\n" +
      "      */\n" +
      "          .mcnBoxedTextContentContainer\n" +
      "   .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{\n" +
      "              /*@editable*/font-size:16px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Preheader Visibility\n" +
      "      @tip Set the visibility of the email's preheader on small screens. You\n" +
      "   can hide it to save space.\n" +
      "      */\n" +
      "          #templatePreheader{\n" +
      "              /*@editable*/display:block !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Preheader Text\n" +
      "      @tip Make the preheader text larger in size for better readability on\n" +
      "   small screens.\n" +
      "      */\n" +
      "          #templatePreheader .mcnTextContent,#templatePreheader\n" +
      "   .mcnTextContent p{\n" +
      "              /*@editable*/font-size:12px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Header Text\n" +
      "      @tip Make the header text larger in size for better readability on small\n" +
      "   screens.\n" +
      "      */\n" +
      "          #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{\n" +
      "              /*@editable*/font-size:16px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Body Text\n" +
      "      @tip Make the body text larger in size for better readability on small\n" +
      "   screens. We recommend a font size of at least 16px.\n" +
      "      */\n" +
      "          #templateBody .mcnTextContent,#templateBody .mcnTextContent p{\n" +
      "              /*@editable*/font-size:16px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }   @media only screen and (max-width: 480px){\n" +
      "      /*\n" +
      "      @tab Mobile Styles\n" +
      "      @section Footer Text\n" +
      "      @tip Make the footer content text larger in size for better readability\n" +
      "   on small screens.\n" +
      "      */\n" +
      "          #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{\n" +
      "              /*@editable*/font-size:12px !important;\n" +
      "              /*@editable*/line-height:150% !important;\n" +
      "          }\n" +
      "  \n" +
      "  }\n" +
      "  </style>\n" +
      "</head>\n" +
      "\n" +
      '<body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n' +
      ' background-color: #fed149; height: 100%; margin: 0; padding: 0; width: 100%">\n' +
      "  <center>\n" +
      '    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:\n" +
      " 100%; background-color: #fed149; height: 100%; margin: 0; padding: 0; width:\n" +
      ' 100%" width="100%">\n' +
      "      <tr>\n" +
      '        <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;\n" +
      ' height: 100%; margin: 0; padding: 0; width: 100%" valign="top">\n' +
      "          <!-- BEGIN TEMPLATE // -->\n" +
      "          <!--[if gte mso 9]>\n" +
      '              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">\n' +
      "                <tr>\n" +
      '                  <td align="center" valign="top" width="600" style="width:600px;">\n' +
      "                  <![endif]-->\n" +
      '          <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:\n" +
      ' 600px; border: 0" width="100%">\n' +
      "            <tr>\n" +
      '              <td id="templatePreheader" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fed149;\n" +
      ' border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n" +
      ' min-width:100%;" width="100%">\n' +
      '                  <tbody class="mcnTextBlockOuter">\n' +
      "                    <tr>\n" +
      '                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">\n' +
      '                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:\n" +
      ' 100%; min-width:100%;" width="100%">\n' +
      "                          <tbody>\n" +
      "                            <tr>\n" +
      '                              <td class="mcnTextContent" style=\'mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;\n" +
      ' color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px;\n' +
      " line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;\n" +
      ' padding-bottom: 9px; padding-left: 18px;\' valign="top">\n' +
      '                                <a href="https://www.lingoapp.com" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;\n" +
      ' font-weight: normal; text-decoration: none" target="_blank" title="Lingo is the\n' +
      " best way to organize, share and use all your visual assets in one place -\n" +
      ' all on your desktop.">\n' +
      "                                </a>\n" +
      "                              </td>\n" +
      "                            </tr>\n" +
      "                          </tbody>\n" +
      "                        </table>\n" +
      "                      </td>\n" +
      "                    </tr>\n" +
      "                  </tbody>\n" +
      "                </table>\n" +
      "              </td>\n" +
      "            </tr>\n" +
      "            <tr>\n" +
      '              <td id="templateHeader" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;\n" +
      ' border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n" +
      ' min-width:100%;" width="100%">\n' +
      '                  <tbody class="mcnImageBlockOuter">\n' +
      "                    <tr>\n" +
      '                      <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">\n' +
      '                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:\n" +
      ' 100%; min-width:100%;" width="100%">\n' +
      "                          <tbody>\n" +
      "                            <tr>\n" +
      '                              <td class="mcnImageContent" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;\n" +
      ' padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">\n' +
      '                                <a class="" href="https://www.lingoapp.com" style="mso-line-height-rule:\n' +
      " exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:\n" +
      ' #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">\n' +
      '                                  <a class="" href="https://www.lingoapp.com/" style="mso-line-height-rule:\n' +
      " exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:\n" +
      ' #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">\n' +
      '                                    <img align="center" alt="Forgot your password?" class="mcnImage" src="https://static.lingoapp.com/assets/images/email/il-password-reset@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;\n' +
      " text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:\n" +
      ' 0; display: inline !important; vertical-align: bottom;" width="600"></img>\n' +
      "                                  </a>\n" +
      "                                </a>\n" +
      "                              </td>\n" +
      "                            </tr>\n" +
      "                          </tbody>\n" +
      "                        </table>\n" +
      "                      </td>\n" +
      "                    </tr>\n" +
      "                  </tbody>\n" +
      "                </table>\n" +
      "              </td>\n" +
      "            </tr>\n" +
      "            <tr>\n" +
      '              <td id="templateBody" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;\n" +
      ' border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">\n' +
      '                  <tbody class="mcnTextBlockOuter">\n' +
      "                    <tr>\n" +
      '                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">\n' +
      '                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:\n" +
      ' 100%; min-width:100%;" width="100%">\n' +
      "                          <tbody>\n" +
      "                            <tr>\n" +
      '                              <td class="mcnTextContent" style=\'mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;\n" +
      ' color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;\n' +
      " line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;\n" +
      ' padding-bottom: 9px; padding-left: 18px;\' valign="top">\n' +
      "\n" +
      '                                <h1 class="null" style=\'color: #2a2a2a; font-family: "Asap", Helvetica,\n' +
      " sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:\n" +
      " 125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;\n" +
      ' padding: 0\'><span style="text-transform:uppercase">Forgot</span></h1>\n' +
      "\n" +
      "\n" +
      '                                <h2 class="null" style=\'color: #2a2a2a; font-family: "Asap", Helvetica,\n' +
      " sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:\n" +
      " 125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;\n" +
      ' padding: 0\'><span style="text-transform:uppercase">your password?</span></h2>\n' +
      "\n" +
      "                              </td>\n" +
      "                            </tr>\n" +
      "                          </tbody>\n" +
      "                        </table>\n" +
      "                      </td>\n" +
      "                    </tr>\n" +
      "                  </tbody>\n" +
      "                </table>\n" +
      '                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:\n' +
      " 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n" +
      ' min-width:100%;" width="100%">\n' +
      '                  <tbody class="mcnTextBlockOuter">\n' +
      "                    <tr>\n" +
      '                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">\n' +
      '                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:\n" +
      ' 100%; min-width:100%;" width="100%">\n' +
      "                          <tbody>\n" +
      "                            <tr>\n" +
      '                              <td class="mcnTextContent" style=\'mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;\n" +
      ' color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;\n' +
      " line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;\n" +
      ' padding-bottom: 9px; padding-left: 18px;\' valign="top">Not to worry, we got you! Let’s get you a new password.\n' +
      "                                <br></br>\n" +
      "                              </td>\n" +
      "                            </tr>\n" +
      "                          </tbody>\n" +
      "                        </table>\n" +
      "                      </td>\n" +
      "                    </tr>\n" +
      "                  </tbody>\n" +
      "                </table>\n" +
      '                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n" +
      ' min-width:100%;" width="100%">\n' +
      '                  <tbody class="mcnButtonBlockOuter">\n' +
      "                    <tr>\n" +
      '                      <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:\n' +
      " exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n" +
      ' padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">\n' +
      '                        <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">\n' +
      '                          <tbody class="mcnButtonBlockOuter">\n' +
      "                            <tr>\n" +
      '                              <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:\n' +
      " exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n" +
      ' padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">\n' +
      '                                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n" +
      " border-collapse: separate !important;border-radius: 48px;background-color:\n" +
      ' #F57153;">\n' +
      "                                  <tbody>\n" +
      "                                    <tr>\n" +
      '                                      <td align="center" class="mcnButtonContent" style="mso-line-height-rule:\n' +
      " exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\n" +
      " font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;\n" +
      ' padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">\n' +
      '                                        <a class="mcnButton " href="#" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #f57153;\n" +
      " font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:\n" +
      " 1px;line-height: 100%;text-align: center;text-decoration: none;color:\n" +
      ' #FFFFFF; " target="_blank" title="Review Lingo kit\n' +
      ' invitation">' +
      req.body.code +
      "</a>\n" +
      "                                      </td>\n" +
      "                                    </tr>\n" +
      "                                  </tbody>\n" +
      "                                </table>\n" +
      "                              </td>\n" +
      "                            </tr>\n" +
      "                          </tbody>\n" +
      "                        </table>\n" +
      "                      </td>\n" +
      "                    </tr>\n" +
      "                  </tbody>\n" +
      "                </table>\n" +
      '                <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">\n' +
      '                  <tbody class="mcnImageBlockOuter">\n' +
      "                    <tr>\n" +
      '                      <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">\n' +
      '                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:\n" +
      ' 100%; min-width:100%;" width="100%">\n' +
      "                          <tbody>\n" +
      "                            <tr>\n" +
      '                              <td class="mcnImageContent" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;\n" +
      ' padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>\n' +
      "                            </tr>\n" +
      "                          </tbody>\n" +
      "                        </table>\n" +
      "                      </td>\n" +
      "                    </tr>\n" +
      "                  </tbody>\n" +
      "                </table>\n" +
      "              </td>\n" +
      "            </tr>\n" +
      "            <tr>\n" +
      '              <td id="templateFooter" style="mso-line-height-rule: exactly;\n' +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fed149;\n" +
      ' border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">\n' +
      '                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">\n' +
      '                  <tbody class="mcnTextBlockOuter">\n' +
      "                    <tr>\n" +
      '                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">\n' +
      '                        <table align="center" bgcolor="#F7F7FF" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;\n' +
      " mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:\n" +
      " 100%; background:#F7F7FF; margin:auto; text-align:left; max-width:600px;\n" +
      ' font-family: \'Asap\', Helvetica, sans-serif;" text-align="left" width="100%">\n' +
      "                          <tr>\n" +
      '                            <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      ' -webkit-text-size-adjust: 100%">\n' +
      "\n" +
      '                              <h3 style=\'color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;\n' +
      " font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;\n" +
      " letter-spacing: normal; text-align: center; display: block; margin: 0; padding:\n" +
      " 0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>What\n" +
      " is 2nd Chance?</h3>\n" +
      "\n" +
      "                              <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;\n" +
      " -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;\n" +
      ' font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;\n' +
      " text-align: left; text-align: left; font-size: 14px; '>2nd Chance is a platform that gives you the opportunity to gain profit from your used items, either by buying or donating them.\n" +
      "                              </p>\n" +
      '                              <div style="padding-bottom: 18px;">\n' +
      '                                <a href="#" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      " -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none;\n" +
      ' font-size: 14px; color:#F57153; text-decoration:none;" target="_blank" title="Learn more about Lingo">Learn More ❯</a>\n' +
      "                              </div>\n" +
      "                            </td>\n" +
      "                          </tr>\n" +
      "                        </table>\n" +
      '                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;\n' +
      ' -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">\n' +
      "                          <tbody>\n" +
      "                            <tr>\n" +
      '                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      " -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;\n" +
      " padding-bottom: 24px; padding-left: 18px; color: #7F6925; font-family: 'Asap',\n" +
      ' Helvetica, sans-serif; font-size: 12px;" valign="top">\n' +
      "                               </td>\n" +
      "                            </tr>\n" +
      "                            <tbody></tbody>\n" +
      "                          </tbody>\n" +
      "                        </table>\n" +
      '                        <table align="center" border="0" cellpadding="12" style="border-collapse:\n' +
      " collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust:\n" +
      ' 100%; -webkit-text-size-adjust: 100%; ">\n' +
      "                          <tbody>\n" +
      "                            <tr>\n" +
      '                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      ' -webkit-text-size-adjust: 100%">\n' +
      '                                <a href="#" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      ' -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">\n' +
      '                                  <img alt="twitter" height="32" src="https://static.lingoapp.com/assets/images/email/twitter-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration:\n' +
      ' none" width="32" />\n' +
      "                                </a>\n" +
      "                              </td>\n" +
      '                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      ' -webkit-text-size-adjust: 100%">\n' +
      '                                <a href="#" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      " -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration:\n" +
      ' none" target="_blank">\n' +
      '                                  <img alt="Instagram" height="32" src="https://static.lingoapp.com/assets/images/email/instagram-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;\n' +
      ' text-decoration: none" width="32" />\n' +
      "                                </a>\n" +
      "                              </td>\n" +
      '                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      ' -webkit-text-size-adjust: 100%">\n' +
      '                                <a href="#" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      ' -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">\n' +
      '                                  <img alt="medium" height="32" src="https://static.lingoapp.com/assets/images/email/medium-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration: none" width="32" />\n' +
      "                                </a>\n" +
      "                              </td>\n" +
      '                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      ' -webkit-text-size-adjust: 100%">\n' +
      '                                <a href="#" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;\n' +
      ' -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">\n' +
      '                                  <img alt="facebook" height="32" src="https://static.lingoapp.com/assets/images/email/facebook-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;\n' +
      ' text-decoration: none" width="32" />\n' +
      "                                </a>\n" +
      "                              </td>\n" +
      "                            </tr>\n" +
      "                          </tbody>\n" +
      "                        </table>\n" +
      "                      </td>\n" +
      "                    </tr>\n" +
      "                  </tbody>\n" +
      "                </table>\n" +
      "              </td>\n" +
      "            </tr>\n" +
      "          </table>\n" +
      "          <!--[if gte mso 9]>\n" +
      "                  </td>\n" +
      "                </tr>\n" +
      "              </table>\n" +
      "            <![endif]-->\n" +
      "          <!-- // END TEMPLATE -->\n" +
      "        </td>\n" +
      "      </tr>\n" +
      "    </table>\n" +
      "  </center>\n" +
      "</body>\n" +
      "\n" +
      "</html>",
  };

  User.findOne({ email: req.body.mail }).then((user) => {
    user.confirmation = { code: req.body.code, date: new Date() };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    user.save();
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
          res.send({
            success: true,
            token: token,
            id: user._id,
            role: user.role,
          });
        }
      });
    },
    (err) => next(err)
  );
});

router.post("/updateprofilepic", upload.single("image"), async (req, res) => {
  console.log(req.file.filename);
  console.log(req.body.email);

  User.findOne({ email: req.body.email }).then((user) => {
    user.profilepic.push(req.file.filename);
    user.save();
    res.statusCode = 201;
    res.send();
  });
});

router.post("/updatecoverpic", upload.single("image"), async (req, res) => {
  console.log(req.file.filename);
  console.log(req.body.email);

  User.findOne({ email: req.body.email }).then((user) => {
    user.coverpic.push(req.file.filename);
    user.save();
    res.statusCode = 201;
    res.send();
  });
});

router.post("/updateAccount", (req, res) => {
  User.findById(req.body.id).then((user) => {
    /* name,
                    lastname,
                    bio,
                    phone,
                    birthday,
                    address*/
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.lastname) {
      user.lastname = req.body.lastname;
    }
    user.bio = req.body.bio;
    user.phone = req.body.phone;
    user.address = req.body.address;
    if (req.body.fblink && req.body.lilink && req.body.interests) {
      user.fblink = req.body.fblink;
      user.lilink = req.body.lilink;
      for (let i = 0; i < req.body.interests.length; i++) {
        user.interests.push(req.body.interests[i].value);
      }
    }
    user.birthday = req.body.birthday;
    user.firstTime = false;
    user.save();
  });

  res.send({ success: true });
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
      res.send({ fail: true });
    }
  });
});
router.post("/ResetPwd", (req, res) => {
  User.findOne({ email: req.body.mail }).then((user) => {
    if (
      user.confirmation.code === req.body.code &&
      (new Date() - user.confirmation.date) / 60000 < 2
    ) {
      console.log("success verif");
      res.send({ success: true });
    } else {
      console.log("fail verif");
      res.send({ fail: true });
    }
  });
});
//reset password
router.post("/Resetpassword", async (req, res) => {
  User.findOne({ email: req.body.mail }).then(
    function (sanitizedUser) {
      if (sanitizedUser) {
        sanitizedUser.setPassword(req.body.pwd, function () {
          sanitizedUser.save();
          res.status(200).json({ success: "password reset successful" });
        });
      } else {
        res.status(500).json({ fail: "This user does not exist" });
      }
    },
    function (err) {
      console.error(err);
    }
  );
});
//change password
router.post("/Changepassword", async (req, res) => {
  User.findById(req.body.id).then(
    function (sanitizedUser) {
      if (sanitizedUser) {
        sanitizedUser.changePassword(
          req.body.oldpassword,
          req.body.newpassword,
          function (err) {
            if (!err) {
              sanitizedUser.save();
              res.status(200).json({ success: true });
            } else {
              res.status(400).json({ error: "incorrect password" });
            }
          }
        );
      } else {
        res.status(500).json({ fail: "check password" });
      }
    },
    function (err) {
      console.error(err);
    }
  );
});
//twilio messaging
router.post("/sms", (req, res) => {
  const accountSid = Process.env.ACCOUNTSID;
  const authToken = Process.env.AUTHTOKEN;
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: req.body.body,
      messagingServiceSid: "MG90a25962934f830822614125675e97ea",
      to: req.body.phone,
    })
    .then((message) => console.log(message.sid))
    .done();
  res.send({ success: true });
});

//get All
router.get("/getAllUsers", (req, res) => {
  User.find({}).then((users) => {
    res.send({ users });
  });
});
//make admin
router.post("/makeAdmin", (req, res) => {
  User.findById(req.body.id).then((user) => {
    user.role = "admin";
    user.save();
    res.status(200);
    res.send({ ok: true });
  });
});
//make user
router.post("/makeUser", (req, res) => {
  User.findById(req.body.id).then((user) => {
    user.role = "user";
    user.save();
    res.status(200);
    res.send();
  });
});
//block user
router.post("/blockAccount", (req, res) => {
  User.findById(req.body.id).then((user) => {
    user.status = "blocked";
    user.save();
    res.status(200);
    res.send();
  });
});
//unblock user
router.post("/unblockAccount", (req, res) => {
  User.findById(req.body.id).then((user) => {
    user.status = "active";
    user.save();
    res.status(200);
    res.send();
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
