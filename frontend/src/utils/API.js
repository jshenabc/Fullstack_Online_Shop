//utils/API.js

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertProductToCart = payload => api.post(`/cart/add`, payload)
export const getAllProducts = () => api.get(`/products`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getCartByCustomerId = id => api.get(`/cart/${id}`)

const apis = {
    insertProductToCart,
    getAllProducts,
    // updateMovieById,
    // deleteMovieById,
    getCartByCustomerId
}

export default apis