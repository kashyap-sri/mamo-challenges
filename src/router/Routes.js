import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import BasePage from './BasePage';

export default function Routes() {
    return (
        <BrowserRouter>
            <BasePage />
        </BrowserRouter>
    );
}
