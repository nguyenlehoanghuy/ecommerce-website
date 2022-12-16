import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import promotionRoutes from './routes/promotionRoutes.js';
import specificationRoutes from './routes/specificationRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import voucherRoutes from './routes/voucherRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods: ' * '');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    next();
});

app.use(bodyParser.json({ limit: '50mb', inflate: true }));
app.use('/admins', adminRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/promotion', promotionRoutes);
app.use('/specification', specificationRoutes);
app.use('/category', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/voucher', voucherRoutes);
app.use('/invoice', invoiceRoutes);

app.listen(port, () => {
    console.log(`MERN server is listening on port ${port}`);
});
