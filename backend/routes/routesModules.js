const loggedInUserID = "5f35afeaea4b72f505885952";

const productDB = require('../model/productDB.js');
const Product = productDB.getModel();
const cartDB = require('../model/cartDB.js');
const Cart = cartDB.getModel();

// display all products

getProducts = async (req , res) => {

        let products = await Product.find({});

        let results = products.map( product => {
            return {
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                stockQuantity: product.stockQuantity,
                img: product.img
            }
        });
        
        return results;
        // res.render('displayProductsView',
        //         {title:"List of Products", data:results});
        // res.json(results);
        
};

//display carts
getCart = async (req , res) => {

    let cart = await Cart.find({});
    if (cart.length == 0){
        return (async() => {
            let cart1 = new Cart({
                customerID: loggedInUserID,
                products: [],
                cartTotalPrice: 0
            }); 

            // await cart1.save((err) => {
            //     if(err)
            //     console.log("Error : %s ",err);
            // });
            await Promise.all([
                cart1.save()
            ]);
           
            let currentCart = await Cart.find({});
            console.log(currentCart);
            return currentCart;
            process.exit();
        })();
    }else{
        let results = cart;
        return results;
    }

};

// add products to carts
// Cart.findOne({ customerID: loggedInUserID }, (err, cart) => {
//     if (err) {
//         // return res.status(404).json({
//         //     err,
//         //     message: 'Movie not found!',
//         // })
//         console.log("cart not found for this user")
//     }
//     cart.name = body.name
//     cart.time = body.time
//     cart.rating = body.rating
//     cart
//         .save()
//         .then(() => {
//             return res.status(200).json({
//                 success: true,
//                 id: movie._id,
//                 message: 'Movie updated!',
//             })
//         })
//         .catch(error => {
//             return res.status(404).json({
//                 error,
//                 message: 'Movie not updated!',
//             })
//         })
// })


module.exports = {
    getProducts,
    getCart
}