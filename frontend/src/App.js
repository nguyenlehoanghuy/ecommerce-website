import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './Components/NotFound';
import Home from './Components/Home';
import ProductFeatures from 'features/Product';
import ProductListPage from 'features/Product/pages/ProductListPage';
import DetailPage from 'features/Product/pages/DetailPage';
import { injectStore } from 'api/axiosClient';
import { store } from 'app/store';
import Account from 'features/Account/pages/AccountPage';
import CartFeature from 'features/Cart/pages';
import PrivateRoute from 'routes/PrivateRoute';
import DefaultLayout from 'Components/Layout/DefaultLayout';
import { Box } from '@mui/material';
import DashBoard from 'features/Admin/pages/DashBoard';
import AdminLayout from 'Components/Layout/AdminLayout';
import CustomerManager from 'features/Admin/pages/CustomerManager';
import ProductManager from 'features/Admin/pages/ProductManager';
import InvoiceFeature from 'features/Invoice/pages';

function App() {
    injectStore(store);
    return (
        <Box>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="" element={<Home />}></Route>
                    <Route path="/account" element={<PrivateRoute auth="user" />}>
                        <Route path="" element={<Account />}></Route>
                    </Route>
                    <Route path="/cart" element={<PrivateRoute auth="user" />}>
                        <Route path="" element={<CartFeature />}></Route>
                    </Route>
                    <Route path="/invoice" element={<PrivateRoute auth="user" />}>
                        <Route path="" element={<InvoiceFeature />}></Route>
                    </Route>
                    <Route path="/product" element={<ProductFeatures />}>
                        <Route path="" element={<ProductListPage />}></Route>
                        <Route path=":productId" element={<DetailPage />}>
                            <Route path="sub1" element={<Home />}></Route>
                            <Route path="sub2" element={<Home />}></Route>
                        </Route>
                    </Route>
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="" element={<DashBoard />}></Route>
                    <Route path="customer" element={<CustomerManager />}></Route>
                    <Route path="product" element={<ProductManager />}></Route>
                    <Route path="invoices" element={<DashBoard />}></Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    );
}

export default App;
