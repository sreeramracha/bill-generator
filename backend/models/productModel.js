const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "Please enter product company name"],
		},
		category: {
			type: String,
			required: [true, "Please enter product category"],
		},
		name: {
			type: String,
			required: [true, "Please enter product name"],
		},
		price: {
			type: Number,
			required: [true, "Please enter product price"],
		},
		imagePath: {
			type: String,
			required: true,
		},
		imageFileName: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports.productModel = mongoose.model("Product", productSchema);
