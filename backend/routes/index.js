var express = require('express');
var router = express.Router();

// other modules
var routeControl 	= require("./routesModules");
var admin_routeControl 	= require("./admin_routesModules");
// router specs
router.get('/', (req, res) => {
  res.redirect('/products');
});

//customer interface
router.get('/products', routeControl.getProducts);
router.get('/products/:name', routeControl.searchProductsbyName)
router.get('/orders/:id', routeControl.getOrdersbyCustomerID)
router.get('/order/Detail/:id', routeControl.getOrderByID)
router.get('/cart/:id', routeControl.getCart)
router.post('/cart/add', routeControl.updateCart);
router.delete('/cart/delete/custID/:custID/prodID/:prodID', routeControl.removeCart);
router.delete('/cart/deleteAll/custID/:custID', routeControl.removeAllCart);
router.post('/order/submit', routeControl.submitOrder);

//admin interface
router.get('/admin/customers', admin_routeControl.getCustomers);
router.get('/admin/activeOrders', admin_routeControl.getActiveOrders);
router.get('/admin/allOrders', admin_routeControl.getAllOrders);
router.delete('/admin/delete/orderID/:id', admin_routeControl.removeOrder);
router.delete('/admin/delete/productID/:id', admin_routeControl.removeProduct);
module.exports = router;
