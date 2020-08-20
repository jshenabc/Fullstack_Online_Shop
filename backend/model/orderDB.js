const mongoose = require('mongoose');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Fill in the schema definition

let orderSchema = new Schema({
	customerID: String,
	customer: 
		{	
			firstName: String,
			lastName: String,
			email: String,
			address: String,
		}
	,
	products: [
		{
			id: String,
			name: String,
			description: String,
			unitPrice: Number,
			orderQuantity: Number,
			img: String
		}
	],
	status: String,
	orderTotalPrice: Number
}, {
	collection: 'Shen_OnlineShop_Order'
},
	{ timestamps: true },
);

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("OrderModel", 
									orderSchema);
		};
		return model;
	}
};
























