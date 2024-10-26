const path = require("path");
const multer = require("multer");

// *********** Configuración MULTER ******************
const destinationUsers = function (req, file, cb) {
    const pathUpload = path.resolve(__dirname, "../../public/img/user");
    cb(null, pathUpload);
};

const destinationProducts = function (req, file, cb) {
    const pathUpload = path.resolve(__dirname, "../../public/img/products");
    cb(null, pathUpload);
};

const filename = function (req, file, cb) {
    console.log(file);
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
    )}`;
    cb(null, fileName);
};

const storageUsers = multer.diskStorage({
    destination: destinationUsers,
    filename,
});

const storageProducts = multer.diskStorage({
    destination: destinationProducts,
    filename,
});

const uploadUser = multer({ storage: storageUsers });
const uploadProduct = multer({ storage: storageProducts });

module.exports = { uploadProduct, uploadUser };