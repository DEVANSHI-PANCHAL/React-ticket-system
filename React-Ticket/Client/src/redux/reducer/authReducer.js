import {SET_AUTH} from "../action/authAction";

const initialState = {
    user: JSON.parse(localStorage.getItem("user") || null),
    token: localStorage.getItem("token") || null
    
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return { user: action.payload.user, token: action.payload.token };
        default:
            return state;
    }
};

export default authReducer;
