const loggedInUserID = "5f35afeaea4b72f505885952";

const productDB = require('../model/productDB.js');
const Product = productDB.getModel();
const cartDB = require('../model/cartDB.js');
const Cart = cartDB.getModel();

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

//display carts
getCart = async (req , res) => {

    let cart = await Cart.find({});
    if (cart.length == 0){
        (async() => {
            let cart1 = new Cart({
                customerID: loggedInUserID,
                products: []
            }); 

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
        let result = cart;
        return  res.json(result);
    }

};

// add products to carts
updateCart = async (req , res) => {

    // Fill in the code
    //let id = req.body.id;
    Cart.findOne({ customerID: req.body.custID }, (err, cart) => {
      if(err)
        console.log("Error Selecting : %s ", err); 
        let productObj = 	{
			productID: req.body.prodID,
			name: req.body.prodName,
			description: req.body.prodDesc,
			unitPrice: req.body.prodPrice,
            orderQuantity: req.body.prodQuan,
            img:req.body.prodIMG
        };
        let newQuan;
        let found = cart.products.some((product) => {
            newQuan = product.orderQuantity + req.body.prodQuan;
            return product.productID === req.body.prodID;
        });
        if (found) { 
            Cart.findOneAndUpdate(
                {"customerID": req.body.custID, "products.productID": req.body.prodID},{ $set:{ "products.$.orderQuantity" : newQuan }},{ new: true },(err, doc) => {
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
        
    });
    
 };




module.exports = {
    getProducts,
    getCart,
    updateCart
}