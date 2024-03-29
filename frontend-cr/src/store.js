import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer,catListReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer,userListReducer } from "./reducers/userReducer"
import { userRegisterReducer } from "./reducers/userReducer"
import { userDetailsReducer,userOrdersReducer } from "./reducers/userReducer"
import { userUpdateProfileReducer } from "./reducers/userReducer"
import {
    orderCreateReducer,
    orderDetailsReducer,

    orderListMyReducer,
    orderListReducer,
    orderUpdateReducer 
    
} from "./reducers/orderReducers";


const reducer = combineReducers({
    catList:catListReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList:userListReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    OrderList: userOrdersReducer,
    orderAllList: orderListReducer,
    orderUpdate:orderUpdateReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : []
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },


}


const middleware = [thunk]
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store


