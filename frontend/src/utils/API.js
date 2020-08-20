//utils/API.js

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertProductToCart = payload => api.post(`/cart/add`, payload)
export const getAllProducts = () => api.get(`/products`)
export const createOrder = payload => api.post(`/order/submit`, payload)
export const deleteProductById = (custID, prodID) => api.delete(`/cart/delete/custID/${custID}/prodID/${prodID}`)
export const getCartByCustomerId = id => api.get(`/cart/${id}`)
export const getOrdersbyCustomerID = id => api.get(`/orders/${id}`)

const apis = {
    insertProductToCart,
    getAllProducts,
    createOrder,
    deleteProductById,
    getCartByCustomerId,
    getOrdersbyCustomerID
}

export default apis