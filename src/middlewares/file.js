const multer = require("multer")
const path = require("path"); 


const storage = multer.diskStorage({
    destination:"src/public/Images/",
    // filename:(req,file,cb) => {
    //     cb(null,file.originalname)
    // }
//      filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     const baseName = path.basename(file.originalname, ext);
//     cb(null, `${baseName}-${uniqueSuffix}${ext}`);
//   }
 filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-').replace(/[^\w.-]/g, '');
    cb(null, safeName);
  }
})

const upload = multer({
    storage
})

const Singleupload = upload.single("uploadfile")

module.exports = Singleupload
