// react improts
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// third party imports

// in-app imports
import Payments from '../app/pages/Payments';
import Expenses from '../app/pages/Expenses';
import PaymentStatus from '../app/pages/PaymentStatus';


export default function BasePage() {
    return (
        <Routes>
            <Route path='/' element={<Payments />} />
            <Route path='/expenses' element={<Expenses />} />
            <Route path='/payment-success' element={<PaymentStatus status="success" />} />
            <Route path='/payment-failure' element={<PaymentStatus status="failure" />} />
        </Routes>
    );
}
