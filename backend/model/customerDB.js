const mongoose = require('mongoose');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Fill in the schema definition

let customerSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	address: String,
	orders: [
		{orderID : String}
	]
}, {
	collection: 'Shen_OnlineShop_Customer'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("CustomerModel", 
									customerSchema);
		};
		return model;
	}
};
























