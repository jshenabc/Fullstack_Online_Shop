var express = require('express');
var router = express.Router();

// other modules
var routeControl 	= require("./routesModules");

// router specs
router.get('/', (req, res) => {
  res.redirect('/products');
});

router.get('/products', routeControl.getProducts);
router.get('/orders/:id', routeControl.getOrdersbyCustomerID)
router.get('/order/Detail/:id', routeControl.getOrderByID)
router.get('/cart/:id', routeControl.getCart)
router.post('/cart/add', routeControl.updateCart);
router.delete('/cart/delete/custID/:custID/prodID/:prodID', routeControl.removeCart);
router.delete('/cart/deleteAll/custID/:custID', routeControl.removeAllCart);
router.post('/order/submit', routeControl.submitOrder);
// router.get('/products', async function(req, res) {
// 	let result = await routeControl.getProducts();
// 	res.json(result);
// });

// router.get('/cart', async function(req, res) {
// 	let result = await routeControl.getCart();
// 	res.json(result);
// });

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
