const productDB = require('../model/productDB.js');
const Product = productDB.getModel();
const orderDB = require('../model/orderDB.js');
const Order = orderDB.getModel();
const customerDB = require('../model/customerDB.js');
const Customer = customerDB.getModel();
// const loggedInUserID = "5f35afeaea4b72f505885952";

getCustomers = async (req , res) => {

    let customer = await Customer.find({});

    let result = customer.map( customer => {
        return {
            id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            address: customer.address,
        }
    });

    res.format({

        'application/json': function() {
            res.json(result);
        },

        'application/xml': function() {
            let resultXml = 
                '<?xml version="1.0"?>\n' +
                result.map((result) => {
                    return ( '<customerID id="' + result.id + '">\n' + 
                    '   <firstName>' + result.firstName + '</firstName>\n' + 
                    '   <lastName>' + result.lastName + '</lastName>\n' + 	
                    '   <email>' + result.email + '</email>\n' + 		
                    '   <address>' + result.address + '</address>\n' + 	 
                    '</customerID>\n')
                }).join('\n');
                
                       
            
            res.type('application/xml');
            res.send(resultXml);
        },

    });
    
};

//get all orders which are active status
getActiveOrders  = async (req , res) => {

    await Order.find({ status: "active" }, (err, orders) => {
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

//get all orders including history orders
getAllOrders  = async (req , res) => {

    await Order.find({}, (err, orders) => {
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

// delete selected order
removeOrder = async (req , res) => {


    let orderIDParam = req.params.id;

   await Order.deleteOne({ _id : orderIDParam }, (err) => {
        if(err)
            console.log("Error Selecting : %s ", err); 
        return res.json({
            success: true,
            id: orderIDParam,
            message: 'order removed!',
        })           
    }).catch(err => console.log(err))
    
};
// delete selected product
removeProduct = async (req , res) => {


    let productIDParam = req.params.id;

   await Product.deleteOne({ _id : productIDParam }, (err) => {
        if(err)
            console.log("Error Selecting : %s ", err); 
        return res.json({
            success: true,
            id: productIDParam,
            message: 'order removed!',
        })           
    }).catch(err => console.log(err))
    
};
module.exports = {
    getCustomers,
    getActiveOrders,
    getAllOrders,
    removeOrder,
    removeProduct,
}