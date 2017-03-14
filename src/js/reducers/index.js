import {combineReducers} from 'redux';

import exchanges from './exchanges';

const allReducers = combineReducers({
    exchanges: exchanges
});

export default allReducers;