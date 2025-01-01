const { productModel } = require("../models/productModel");
const path = require("path");

module.exports.addProduct = async (req, res) => {
	// console.log(req.file);

	try {
		const { path, filename } = req.file;
		const { company, category, name, price } = req.body;

		console.log(req.body);

		const data = await productModel({
			company,
			category,
			name,
			price,
			imagePath: path,
			imageFileName: filename,
		});
		await data.save();

		res.status(200).json({ res: "Data uploaded successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.body;
		const product = await productModel.findByIdAndDelete(id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports.updateProduct = async (req, res) => {
	try {
		const { name } = req.body;

		// console.log(name);
		// console.log(req.body);

		const product = await productModel.findOneAndUpdate({ name }, req.body);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		const updatedProduct = await productModel.findOne({ name });
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports.getAllProducts = async (req, res) => {
	try {
		const products = await productModel.find({});
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports.getProductImage = async (req, res) => {
	try {
		const { imageFileName } = req.params;
		// console.log(req.params);

		const image = path.join(__dirname, "../Images", imageFileName);
		res.sendFile(image);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
