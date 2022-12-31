const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        console.log(1);
        console.log(file);
        if (!file.mimetype.match('image/jpeg|image/png|image/gif|image/webp')) {  //image/jpeg contains both jpeg and jpg
            console.log('wrong');
            console.log(file.mimetype);
            cb(new Error('File is not supported'), false)
            return
        }
        console.log(2)
        cb(null, true)
        console.log(3);
    }
})
