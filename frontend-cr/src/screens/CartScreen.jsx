import { Link,useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Row,Col,ListGroup,Image,Form,Button,Card, Container } from "react-bootstrap"
import { addToCart } from "../actions/cartActions"
import { Navigate, useParams } from "react-router"
import { removeFromCart } from "../actions/cartActions"
import uuid from 'react-uuid';

const CartScreen = () => {
const productId = useParams()
// alert(productId.id)
const qty = window.location.search ? Number(window.location.search.split('=')[1]) : 1

const dispatch = useDispatch()
const user = useSelector(state => state.userLogin)

const cart = useSelector(state => state.cart)
const { cartItems } = cart
const navigate = useNavigate()
console.log(cartItems[0])
useEffect(() => {
    if (productId.id) {
        
        dispatch(addToCart(productId.id, qty))
    }
}, [dispatch, productId.id, qty])

const removeFromCartHandler = (id) => {
    console.log(id)
    dispatch(removeFromCart(id))
}
const baseURL = "http://127.0.0.1:8000"
const checkoutHandler = () => {
  
        if(!user.userInfo){
            navigate('/login')
        }   
        else{
            navigate('/shipping')
        } 
}
   return(
       <Container>
    <Row>
    <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
            <Container>
                <h1>Your Cart is Empty</h1>
            </Container>
        ) : (   
                
                <ListGroup variant='flush'>
                    {cartItems.map((item,index) => (
                        <ListGroup.Item key={uuid()}>
                            
                            <Row>
                                <Col md={2}>
                                    <Image src={baseURL + item.image} alt={"GFef"} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>

                                <Col md={2}>
                                    ${item.price}
                                </Col>

                                <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {

                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }

                                    </Form.Control>
                                </Col>

                                <Col md={1}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(index)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            
            )}
    </Col>

    <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
                <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                >
                    Proceed To Checkout
                </Button>
            </ListGroup.Item>


        </Card>
    </Col>
</Row>
</Container>
   )
}

export default CartScreen