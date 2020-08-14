const CustomerDB = require('./customerDB.js');
const Customer = CustomerDB.getModel();

//initiate customer data
(async() => {

	await Customer.deleteMany({});

	let customer1 = new Customer({
		firstName:'John',lastName:'Smith',email:'JohnSmith@bu.edu', orders:[]
	}); 

	let customer2 = new Customer({
		firstName:'Jane',lastName:'Smith',email:'JaneSmith@bu.edu', orders:[]
	}); 

	let customer3 = new Customer({
		firstName:'John',lastName:'Doe',email:'JohnDoe@bu.edu', orders:[]
	}); 


	await Promise.all([
		customer1.save(), 
		customer2.save(), 
		customer3.save()
	]);

	let currentCustomers = await Customer.find({});

	console.log(currentCustomers);

	process.exit();


})();

//initiate product data
const ProductDB = require('./productDB.js');
const Product = ProductDB.getModel();

(async() => {

	await Product.deleteMany({});

	let product1 = new Product({
		name:'Apple 16" MacBook Pro with Touch Bar', description:'9th-Gen 8-Core Intel i9 2.3GHz, 16GB RAM, 1TB SSD, AMD Radeon Pro 5500M 8GB, Space Gray, Late 2019 ', price: 2869.99 , stockQuantity: 10, img:'mac16.jpg'
	}); 

	let product2 = new Product({
		name:'New Apple iPad Pro', description:'(12.9-inch, Wi-Fi, 256GB) - Space Gray (4th Generation)', price: 1099.99 , stockQuantity: 5, img:'ipadPro.jpg'
	}); 

	let product3 = new Product({
		name:'Apple iPhone 11 Pro', description:'(64GB, Midnight Green) + Wireless Plan', price: 999.99 , stockQuantity: 20, img:'iphone11.jpg'
	}); 

	await Promise.all([
		product1.save(), 
		product2.save(), 
		product3.save()
	]);

	let currentProduct = await Product.find({});

	console.log(currentProduct);

	process.exit();


})();
