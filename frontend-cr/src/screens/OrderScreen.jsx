import React, {  useEffect } from "react";



import "../loeader.css"
import Spinner from "react-bootstrap/Spinner";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
// import ProductData from "../ProductData";
import { useParams } from "react-router";
import { getOrderDetails } from "../actions/orderActions";

function OrderScreen({ match }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);

  

  useEffect(() => {
    dispatch(getOrderDetails(id));
 
  }, []);

  const block = {
    display:"inline-block"
  }

  return (
    <div>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <Spinner animation="grow" variant="success" role="status"></Spinner>
          <span className="visually-hidden">
            Please wait while we process your order
          </span>
        </div>
      ) : (
        <>
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <svg
              class="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
           
            </svg>
          
          </div>
          <div>&nbsp;
          <h2>Congratulations!we have recieved your order,below are the order details</h2>

          

        
          </div>

        </div>

        </>


        
      )}
    </div>
  );
}

export default OrderScreen;
