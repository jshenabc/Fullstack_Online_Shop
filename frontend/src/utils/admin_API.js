//utils/admin_API.js

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

// export const insertProductToCart = payload => api.post(`/cart/add`, payload)
export const admin_getAllCustomers = () => api.get(`/admin/customers`)
export const admin_getAllActiveOrders = () => api.get(`/admin/activeOrders`)
export const admin_getAllOrders = () => api.get(`/admin/allOrders`)
export const admin_deleteSelectedOrder = id => api.delete(`/admin/delete/orderID/${id}`)
export const admin_deleteSelectedProduct = id => api.delete(`/admin/delete/productID/${id}`)
// export const createOrder = payload => api.post(`/order/submit`, payload)
// export const deleteProductById = (custID, prodID) => api.delete(`/cart/delete/custID/${custID}/prodID/${prodID}`)
// export const deleteAllProductFromCart = (custID) => api.delete(`/cart/deleteAll/custID/${custID}`)
// export const getCartByCustomerId = id => api.get(`/cart/${id}`)
// export const getOrdersbyCustomerID = id => api.get(`/orders/${id}`)
// export const getOrderbyID = id => api.get(`/order/Detail/${id}`)

const admin_API = {
    admin_getAllCustomers,
    admin_getAllActiveOrders,
    admin_getAllOrders,
    admin_deleteSelectedOrder,
    admin_deleteSelectedProduct
}

export default admin_API