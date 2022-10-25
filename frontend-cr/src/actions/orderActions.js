/* AXIOS */
import axios from "axios";

/* ACTION TYPES */
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
ORDER_LIST_MY_REQUEST,
ORDER_LIST_MY_SUCCESS,
ORDER_LIST_MY_FAIL,
ORDER_LIST_REQUEST,
ORDER_LIST_SUCCESS,
ORDER_LIST_FAIL,
ORDER_STATUS_UPDATE_REQUEST,
ORDER_STATUS_UPDATE_SUCCESS,
ORDER_STATUS_UPDATE_FAIL,

} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

/* ACTION CREATOR USED IN CREATING ORDER IN PlaceOrderScreen COMPONENT  */
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`http://localhost:8000/order/add/`, order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`http://localhost:8000/order/${id}/`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `http://localhost:8000/myorders/`,
            config
        )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const getallOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`http://localhost:8000/myorders/`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`http://localhost:8000/getorders/`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const updateOrderStatusAdmin = (oid,status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_STATUS_UPDATE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const orderData = {"order_id":oid,"order_status":status}
    /* MAKE PUT REQUEST TO SET THE THE USER DATA */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.put(`http://127.0.0.1:8000/updateorder/`, orderData, config);

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_STATUS_UPDATE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_STATUS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};