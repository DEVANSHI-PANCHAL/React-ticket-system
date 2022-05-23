import { combineReducers, legacy_createStore } from 'redux';
import authReducer from "../reducer/authReducer";

const reducer = combineReducers({
    auth: authReducer
});
const store = legacy_createStore(reducer);

export default store;
