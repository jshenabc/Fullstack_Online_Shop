const productDB = require('../model/productDB.js');
const Product = productDB.getModel();
const cartDB = require('../model/cartDB.js');
const Cart = cartDB.getModel();
const orderDB = require('../model/orderDB.js');
const Order = orderDB.getModel();
// const loggedInUserID = "5f35afeaea4b72f505885952";
// display all products

getProducts = async (req , res) => {

        let products = await Product.find({});

        let result = products.map( product => {
            return {
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                stockQuantity: product.stockQuantity,
                img: product.img
            }
        });

        return  res.json(result);
        // return results;
        // res.render('displayProductsView',
        //         {title:"List of Products", data:results});
        // res.format({

        //     'application/json': function() {
        //         res.json(result);
        //     },
    
        //     'application/xml': function() {
        //         let resultXml = 
        //             '<?xml version="1.0"?>\n' +
        //                     '<zipCode id="' + result._id + '">\n' + 
        //                     '   <city>' + result.city + '</city>\n' + 
        //                     '   <state>' + result.state + '</state>\n' + 	
        //                     '   <pop>' + result.pop + '</pop>\n' + 				 
        //                     '</zipCode>\n';
                        
                
        //         res.type('application/xml');
        //         res.send(resultXml);
        //     },
    
        // });
        
};


getCart = async (req , res) => {

    let cart = await Cart.find({});
    if (cart.length == 0){
        (async() => {
            let cart1 = new Cart({
                customerID: req.params.id,
                products: []
            }); 
            console.log(cart1);
            // await cart1.save((err) => {
            //     if(err)
            //     console.log("Error : %s ",err);
            // });
            await Promise.all([
                cart1.save()
            ]);
           
            let currentCart = await Cart.find({});
            return res.json(currentCart);
            // process.exit();
        })();
    }else{
        await Cart.findOne({ customerID: req.params.id }, (err, cart) => {
            if (err) {
                return res.json({ success: false, error: err })
            }
    
            if (!cart) {
                return res.json({ success: false, error: `Cart not found` })
            }
            return res.json({ success: true, data: cart })
        }).catch(err => console.log(err))
    }
};

getOrdersbyCustomerID = async (req , res) => {
    let queryID = req.params.id;
    console.log("queryID",queryID)
    await Order.find({ customerID: req.params.id }, (err, orders) => {
        if (err) {
            return res.json({ success: false, error: err })
        }
        console.log("orders",orders)
        if (!orders) {
            return res.json({ success: false, error: `Orders not found` })
        }
        return res.json({ success: true, data: orders })
    }).catch(err => console.log(err))
};

// add products to carts
updateCart = async (req , res) => {

    // Fill in the code
    //let id = req.body.id;
    await Cart.findOne({ customerID: req.body.custID }, (err, cart) => {
      if(err)
        console.log("Error Selecting : %s ", err); 
        let productObj = 	{
			id: req.body.prodID,
			name: req.body.prodName,
			description: req.body.prodDesc,
			unitPrice: req.body.prodPrice,
            orderQuantity: req.body.prodQuan,
            img:req.body.prodIMG
        };
        let newQuan;
        let found = cart.products.some((product) => {
            newQuan = product.orderQuantity + req.body.prodQuan;
            return product.id === req.body.prodID;
        });
        if (found) { 
            Cart.findOneAndUpdate(
                {"customerID": req.body.custID, "products.id": req.body.prodID},{ $set:{ "products.$.orderQuantity" : newQuan }},{ new: true },(err, doc) => {
                    if(err){
                        console.log("Cart not updated!");
                    }
                    return res.json({
                        success: true,
                        data: doc,
                        message: 'Cart updated!',
                    })
                }
            )
        }else{
            cart.products.push(productObj);
            cart.save()
            .then(() => {
                return res.json({
                    success: true,
                    id: req.body.prodID,
                    message: 'Cart updated!',
                })
            })
            .catch(error => {
                return res.json({
                    error,
                    message: 'Cart not updated!',
                })
            })
        }
        
    }).catch(err => console.log(err))
    
 };

// delete products from carts
removeCart = async (req , res) => {

   console.log(req.params.custID);
   console.log(req.params.prodID);


   await Cart.findOne({ customerID: req.params.custID }, (err, cart) => {
        if(err)
            console.log("Error Selecting : %s ", err); 

        cart.products = cart.products.filter(product => product.id !== req.params.prodID)


        cart.save()
        .then(() => {
            return res.json({
                success: true,
                id: req.params.prodID,
                message: 'prodID removed!',
            })
        })
        .catch(error => {
            return res.json({
                error,
                message: 'prodID not removed!',
            })
        })
            
    }).catch(err => console.log(err))
    
 };

//submit Order
submitOrder = (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body) {
        return res.json({
            success: false,
            error: 'You must provide a order',
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.json({ success: false, error: err })
    }

    order
        .save()
        .then(() => {
            return res.json({
                success: true,
                id: order._id,
                message: 'Order created!',
            })
        })
        .catch(error => {
            return res.json({
                error,
                message: 'Order not created!',
            })
        })
}

// submitOrder = async (req , res) => {

//     let product1 = new Product({
// 		name:'Apple 16" MacBook Pro with Touch Bar', description:'9th-Gen 8-Core Intel i9 2.3GHz, 16GB RAM, 1TB SSD, AMD Radeon Pro 5500M 8GB, Space Gray, Late 2019 ', price: 2869.99 , stockQuantity: 10, img:'mac16.jpg'
//     }); 
    
//     cart.products.push(productObj);
//             cart.save()
//             .then(() => {
//                 return res.json({
//                     success: true,
//                     id: req.body.prodID,
//                     message: 'Cart updated!',
//                 })
//             })
//             .catch(error => {
//                 return res.json({
//                     error,
//                     message: 'Cart not updated!',
//                 })
//             })
    
//  };

module.exports = {
    getProducts,
    getCart,
    updateCart,
    removeCart,
    submitOrder,
    getOrdersbyCustomerID,
}