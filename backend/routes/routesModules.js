const productDB = require('../model/productDB.js');
const Product = productDB.getModel();

// display all products

getProducts = async (req , res , next) => {

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

module.exports = {
    getProducts
}