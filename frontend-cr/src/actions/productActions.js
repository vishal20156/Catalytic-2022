import{
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    CAT_LIST_REQUEST,
    CAT_LIST_SUCCESS,
    CAT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

import axios from 'axios'

export const listProduct = () => async (dispatch) => {
    try{
     
        dispatch({type:PRODUCT_LIST_REQUEST})
        const { data } = await axios.get('http://localhost:8000/products/fetch/')
        
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
        
    }
    catch(error){

        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}


export const listCat = () => async (dispatch) => {
    try{
        
        dispatch({type:CAT_LIST_REQUEST})
        const { data } = await axios.get('http://localhost:8000/products/categories/')
        
        dispatch({
            type:CAT_LIST_SUCCESS,
            payload:data
        })
        
    }
    catch(error){

        dispatch({
            type:CAT_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        
        const { data } = await axios.get(`http://localhost:8000/products/${id}/`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

