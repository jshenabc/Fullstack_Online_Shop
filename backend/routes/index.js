var express = require('express');
var router = express.Router();

// other modules
var routeControl 	= require("./routesModules");
// var addEmployee 			= require("./addEmployee");
// var saveEmployee 			= require("./saveEmployee");
// var editEmployee 			= require("./editEmployee");
// var saveAfterEdit 	= require("./saveAfterEdit");
// var deleteEmployee 		= require("./deleteEmployee");
// var deleteEmployeeAfterConfirm 		= require("./deleteEmployeeAfterConfirm");


// router specs
router.get('/', (req, res) => {
  res.redirect('/products');
});

// router.get('/products', routeControl.getProducts);
router.get('/products', async function(req, res) {
	let result = await routeControl.getProducts();
	res.json(result);
}
);
// router.get('/products', async function(req, res) {
//   let result = await routeControl.getProducts;
// 	res.json(result)
// });

// router.get('/employees/add', 				addEmployee);
// router.post('/employees/add', 			saveEmployee);

// router.get('/employees/edit/:id', 	editEmployee);
// router.post('/employees/edit/', 	saveAfterEdit);

// router.get('/employees/delete/:id', deleteEmployee);
// router.post('/employees/delete', deleteEmployeeAfterConfirm);

module.exports = router;