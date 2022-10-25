import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
         
USER_ORDER_DETAILS_REQUEST, 
USER_ORDER_DETAILS_SUCCESS,
USER_ORDER_DETAILS_FAIL,
USER_ORDER_DETAILS_RESET,
USER_LIST_REQUEST,
USER_LIST_SUCCESS,
USER_LIST_FAIL,
USER_LIST_RESET
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post("http://localhost:8000/login/",{ username: email, password: password },config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }

};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_ORDER_DETAILS_RESET });
  dispatch({type:USER_LIST_RESET})


};

export const register = (name, email, password,contact) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/register/",
      { name: name, email: email, password: password,contact:contact },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();
console.log(`${userInfo.token}`)
    /* MAKE GET REQUEST TO GET BACK THE USER DATA */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.get(`http://127.0.0.1:8000/profile/`, config);

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    /* MAKE PUT REQUEST TO SET THE THE USER DATA */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.put(`http://127.0.0.1:8000/profile/update/`, user, config);

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    /* AFTER UPDATING PROFILE INFORMATION WE WANT TO LOG THE USER IN WITH THE UPDATED INFO */
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    /* SETTING UPDATED VALUE OF USER INFO IN LOCAL STORAGE */
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};






export const getUserOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ORDER_DETAILS_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();
console.log(`${userInfo.token}`)
    /* MAKE GET REQUEST TO GET BACK THE USER DATA */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.get(`http://127.0.0.1:8000/myorders/`, config);
	//console.log(data)
    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: USER_ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};







export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    /* MAKE PUT REQUEST TO SET THE THE USER DATA */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.get(`http://127.0.0.1:8000/users/`, config);

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });


  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
