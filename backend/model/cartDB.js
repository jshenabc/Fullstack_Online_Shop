const mongoose = require('mongoose');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Fill in the schema definition

let cartSchema = new Schema({
	customerID: String,
	products: [
		{
			id: String,
			name: String,
			description: String,
			unitPrice: Number,
			orderQuantity: Number,
			img: String
		}
	]
}, {
	collection: 'Shen_OnlineShop_Cart'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("CartModel", 
									cartSchema);
		};
		return model;
	}
};
























