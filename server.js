const express = require('express');
const handlebars = require('express-handlebars');
const productsRoutes = require('./src/routes/productsRoutes');
const cartsRoutes = require('./src/routes/cartsRoutes');

const app = express();
const PORT = 8080;

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.get('/products', (req, res) => {
    const products = [
        { name: 'Producto 1', price: 10 },
        { name: 'Producto 2', price: 20 },
        { name: 'Producto 3', price: 30 }
    ];
    res.render('products', { title: 'Lista de Productos', products });
});

app.get('../models/carts.js', (req, res) => {
    const products = [
        { name: 'Producto 1', quantity: 2 },
        { name: 'Producto 2', quantity: 1 }
    ];
    res.render('carts', { title: 'Carrito de Compras', products });
});

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});

