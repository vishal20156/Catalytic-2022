import{
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    
    CAT_LIST_REQUEST,
    CAT_LIST_SUCCESS,
    CAT_LIST_FAIL,
} from '../constants/productConstants'
export const productListReducer = (state = {products:[]},action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST :
            return {loading:true,products:[]}
        case PRODUCT_LIST_SUCCESS :
            return{ loading:false,products:action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading:false,error:action.payload} 
        default:
            return state
    }
}


export const catListReducer = (state = {category:[]},action) => {
    switch(action.type){
        case CAT_LIST_REQUEST :
            return {loadingcat:true,category:[]}
        case CAT_LIST_SUCCESS :
            return{ loadingcat:false,category:action.payload }
        case CAT_LIST_FAIL:
            return { loadingcat:false,error:action.payload} 
        default:
            return state
    }
}



export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
