//utils/API.js

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

// export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllProducts = () => api.get(`/products`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    // insertMovie,
    getAllProducts,
    // updateMovieById,
    // deleteMovieById,
    // getMovieById,
}

export default apis