const multer = require("Multer");
const path = require("path");

//to give the storage location and file name;
const storage = multer.diskStorage({
    destination: '../client/src/assets/',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadProductImage = multer({
    storage: storage,
    limits: {fileSize: 20971520},//20MB file size limit
}).single('file');


module.exports.saveProductImage = (req,res, callback) => {
    uploadProductImage(req,res, (err)=>{
		if(err){
			callback(err);
		}
		else{
            callback(null,req.file.filename);
		}
    }
)};