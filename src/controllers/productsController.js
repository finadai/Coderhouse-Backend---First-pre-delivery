const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const { query } = require('express');
const Product = require('../models/products.js');

exports.getAllProducts = async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);

        const skip = (page - 1) * limit;
        let queryObj = {};
        if (query) {
            const parts = query.split(':');
            if (parts.length === 2 && parts[0] === 'availability') {
                queryObj.availability = parts[1] === 'true' ? true : false;
            }
        }
        

        const products = await Product.find(queryObj)
            .limit(limit)
            .skip(skip)
            .sort(sort);

        const totalProducts = await Product.countDocuments(queryObj);
        const totalPages = Math.ceil(totalProducts / limit);

        const response = {
            status: 'success',
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
            nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null
        };

        res.json(response);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ status: 'error', message: 'Error al obtener productos' });
    }
};

