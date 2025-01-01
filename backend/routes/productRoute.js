const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
	addProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
	getProductImage,
} = require("../controllers/productController");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./Images");
	},
	filename: function (req, file, cb) {
		// cb(null, Date.now() + "-" + file.originalname);
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

router.get("/getAllProducts", getAllProducts);
router.get("/getProductImage/:imageFileName", getProductImage);

router.put("/updateProduct", upload.single("image"), updateProduct);

// router.post("/addProduct", upload.single("image"), addProduct);
router.post("/addProduct", upload.single("image"), addProduct);
router.post("/deleteProduct", deleteProduct);

module.exports = router;
