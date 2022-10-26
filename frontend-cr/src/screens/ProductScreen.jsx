import { Row, Col, ListGroup, Button, Card, ListGroupItem, Form } from "react-bootstrap";
// import ProductData from "../ProductData";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import ModalReact from "../comps/ModalReact";

function ProductScreen({ match }) {
    const baseURL = "http://127.0.0.1:8000"
    const [qty, setQty] = useState(1)
    const { id } = useParams();
    const navigate = useNavigate();



    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, product } = productDetails


    useEffect(() => {
        dispatch(listProductDetails(id))

    }, [])

    //   let product = {}


    const addToCartMethod = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return <>
        {
            loading ?
            <div className='d-flex justify-content-center'>
             <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> 
            </div> : <div>
                <div className="container my-5">
                    <Row>
                        <Col md={6}>
                        <img src = {baseURL + product.image} className = "jqzoom" height = "420"/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price : Rs.{product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description : {product.description}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    {/* <Button className="btn-success">Get Nutritional Facts</Button> */}
                                    <ModalReact product = {product.name}/>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>

                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>Rs.{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}

                                    <ListGroup.Item>

                                        <Button
                                            onClick={addToCartMethod}
                                            className="btn-block" disabled={product.countInStock <= 0} type="button">Add to Cart</Button>

                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>

                        </Col>
                    </Row>
                </div>

            </div>
        }

    </>;

}
export default ProductScreen;
