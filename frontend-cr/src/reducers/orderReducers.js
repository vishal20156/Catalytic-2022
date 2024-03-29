/* ACTION TYPES */
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_STATUS_UPDATE_REQUEST,
    ORDER_STATUS_UPDATE_SUCCESS,
    ORDER_STATUS_UPDATE_FAIL,


} from "../constants/orderConstants";

/* REDUCER USED IN PlaceOrder COMPONENT */
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
            };

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            };

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case ORDER_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

/* REDUCER USED IN PlaceOrder COMPONENT TO STORE ORDER DETAILS */
export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {

        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


/* REDUCER USED TO GET DATA OF ALL THE ORDERS PLACED BY USER IN ProfileScreen COMPONENT */
export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true,
            };

        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        // WHEN USER LOGS OUT WE WANT ALL DATA REGARDING ORDERS TO BE RESET AS WELL
        case ORDER_LIST_MY_RESET:
            return { orders: [] };

        default:
            return state;
    }
};

/* REDUCER USED TO GET DATA OF ALL THE ORDERS PLACED BY ALL USERS IN OrderListScreen COMPONENT */
export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true,
            };

        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};




export const orderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_STATUS_UPDATE_REQUEST:
            return { updatingOrderStatus: true }
        case ORDER_STATUS_UPDATE_SUCCESS:
            return { updatingOrderStatus: false, success: true }
        case ORDER_STATUS_UPDATE_FAIL:
            return { error: true }
        default:
            return state
    }
}

