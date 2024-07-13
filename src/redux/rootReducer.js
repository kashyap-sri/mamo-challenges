import { combineReducers } from 'redux';

import rootSlices from './root/slices';

export const rootReducer = combineReducers({
    root: rootSlices,
});
