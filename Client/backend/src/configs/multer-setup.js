// Move the import of the multer middleware and its configuration to the routes where it's needed
import multer from 'multer';
import path from 'path';
import db from "../configs/database.js"



// Define the multer storage and upload middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB file size limit
    }
});


export default upload;


