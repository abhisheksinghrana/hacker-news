import { combineReducers } from 'redux';

import hackerNews from './hackerNewsReducer';

const rootReducer = combineReducers({
    hackerNews,
});

export default rootReducer;