import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';


const rootReducer = {};

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer
}));


export default reducer;
