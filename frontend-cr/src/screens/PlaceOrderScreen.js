
import React, { useState, useEffect } from "react";
import {  Row,Col,ListGroup,Image,Card,Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../comps/Message";
import { useNavigate,Link} from "react-router-dom";
import { CheckoutSteps } from "../comps/CheckoutSteps"
import {setPaymentState,setShippingState} from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Spinner from 'react-bootstrap/Spinner';


function PlaceOrderScreen(){
    const baseURL = "http://127.0.0.1:8000"
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart= useSelector(state => state.cart)
    const orderCrate = useSelector((state) => state.orderCreate);

    const { order, error, success, loading} = orderCrate;
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 100).toFixed(2)
    cart.taxPrice = ((cart.itemsPrice) * (8.2) / 100).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    useEffect(() => {
        if (success) {
            console.log("here");
            console.log(order.order_id);
          navigate(`/order/${order.order_id}/`);

          dispatch({
            type: ORDER_CREATE_RESET,
          });
        }
        // eslint-disable-next-line
      }, [success]);
    const placeOrder = () => {
        dispatch(
            createOrder({
              orderItems: cart.cartItems,
              shippingAddress: cart.shippingAddress,
              paymentMethod: cart.paymentMethod,
              itemsPrice: cart.itemsPrice,
              totalPrice: cart.totalPrice,
            })
          );
    }

    return(

        <div>
        { loading ?  <div className='d-flex justify-content-center'>
          <Spinner animation="grow" role="status">
  
          </Spinner>
        </div> : false}
            <CheckoutSteps step1 step2 step3 step4/>
            <Container>
            <Row>
                <Col md = {8}>
                    <ListGroup variant = "flush">
                        <ListGroup.Item>
                            <h2>Shipping Details</h2>
                            <p>
                                <strong>Shipping :</strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city},
                                {' '}
                                {cart.shippingAddress.country},
                                {' '}
                                {cart.shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method : </h2>
                            <p>
                                <strong>Method - </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (<Message variant = "info">
                            Your cart is empty</Message>) :
                            (
                                <ListGroup variant = "flush">
                                    {cart.cartItems.map((item,index) => (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md = {1}>
                                                    <Image src =  {baseURL + item.image} alt = {item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to = {`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md = {4}>
                                                    {item.qty} X ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
        

                    </ListGroup>
                </Col>
                <Col md = {4}>
                <Card>
                    <ListGroup variant = "flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Item:</Col>
                                <Col>Rs. {cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>Rs. {cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>Rs.{cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>Rs.{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                            type = "button"
                            className = "btn btn-block"
                            disabled={cart.cartItems === 0}
                            onClick = {placeOrder}
                            >Place my order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                </Col>
            </Row>
            </Container>
        </div>
    )
}


export default PlaceOrderScreen