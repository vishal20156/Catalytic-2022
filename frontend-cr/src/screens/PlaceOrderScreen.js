
import React, { useState, useEffect,useRef } from "react";
import {  Row,Col,ListGroup,Image,Card,Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../comps/Message";
import { useNavigate,Link} from "react-router-dom";
import { CheckoutSteps } from "../comps/CheckoutSteps"
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid'

function PlaceOrderScreen(){
    const baseURL = "http://127.0.0.1:8000"
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btn = useRef()
    const cart= useSelector(state => state.cart)
    const orderCrate = useSelector((state) => state.orderCreate);
    const [ dist, setDist ] = useState(0);
    const[ ship,setShip] = useState(0);
    const { order, error, success, loading} = orderCrate;
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
    const [api,setApi] = useState(true);
    cart.taxPrice = 0
    cart.totalPrice = (Number(cart.itemsPrice) + Number(ship) + Number(cart.taxPrice)).toFixed(2)

const fetchDistance = () => {
const origin = cart.shippingAddress.address+cart.shippingAddress.city+cart.shippingAddress.country+cart.shippingAddress.postalCode

        fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=Sher%20E%20Punjab%20Colony,%20Andheri%20East,%20Mumbai,%20Maharashtra%20400093,%20India&destinations=${origin}&key=5wOAJxU6DKL3EsVLOgvTZgRcV2PT2
        `)
  .then((response) => response.json())
  .then((data) => setDist(data['rows'][0]['elements'][0]['distance']['value']))
          //let distance = String(dist
           if((dist / 1000) > 5) {
                setShip(10 * (dist / 1000))
                setApi(false);

           }
            else{
                    cart.shippingPrice = 0
            }


}

useEffect(() => {
  fetchDistance(); // <-- load dog state on initial render
});
    useEffect(() => {



		
        if (success) {
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
                                        <ListGroup.Item key = {uuid()}>
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
                                <Col>Rs. {ship.toFixed(3)}</Col>
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
                            ref={btn}
                            className = "btn btn-block"
                            disabled={api}
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
