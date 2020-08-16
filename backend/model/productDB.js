const mongoose = require('mongoose');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Fill in the schema definition

let productSchema = new Schema({
	name: String,
	description: String,
	price: Number,
	stockQuantity: Number,
	img: String
}, {
	collection: 'Shen_OnlineShop_Product'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("ProductModel", 
									productSchema);
		};
		return model;
	}
};
























