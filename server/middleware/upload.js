const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('////////////////////////////////////////////')
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log('*********************************************')
        cb(null, `${Date.now()}.jpg`);
    },
});

var upload = multer({ storage });

module.exports = upload;
