// absolute imports
import React from 'react';
import { Provider } from 'react-redux';

// in-app imports
import Routes from '../router/Routes';

import { store } from '../redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}
