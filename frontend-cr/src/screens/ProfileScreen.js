import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile, getUserOrderDetails} from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Message } from "../comps/Message";
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid'
function ProfileScreen() {
  const history = useNavigate();
  const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
	const orderstatus = {1 : "Not Packed", 2 : "Ready For Shipment", 3 : "Shipped", 4 : "Delivered"}
    const paystatus = {1 : "Pending",2 : "Failure" , 3 : "Success"}
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success,updatingStatus } = userUpdateProfile
    
    const userOrderDetails = useSelector(state => state.OrderList)
    const {loadingorders,userorders} = userOrderDetails
    useEffect(() => {
        if (!userInfo) {
            history('/login')
        }
        else{
		
            if(!user.name  ){
                   
                    dispatch(getUserDetails())
                
            }
            else{
                setName(user.name)
                setEmail(user.email)
		 dispatch(getUserOrderDetails())

            }
        }
    }, [dispatch,history, userInfo,user,success])
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match")
        }
        else{
            dispatch(updateUserProfile({'id':user._id,'name':name,'email':email,'password':password}))
            setMessage('Updated Profile')
        }

    }
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>User Profile</h2>
          { updatingStatus ?      
          <div className = "d-flex">
          <Spinner animation="border" role="status">
            
          </Spinner>&nbsp;<span>Updating......</span> </div>: message && <Message>{message}</Message> } 
         
            {error && <Message variant = "danger">{error}</Message>}
            <Form onSubmit = {submitHandler} className = "my-5">
                
            <Form.Group controlId='name'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    required
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
            <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
              
                        type='password'
                        placeholder='Enter Password Again'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                     Update
                </Button>
            </Form>
        </Col>
        <Col md={14}>
          <h2>My Orders</h2>
	  {userorders!==undefined ? (
	<Table striped responsive className='table-md table-dark'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Order Items</th>
                                        <th>Total Price</th>
                                        <th>Order Status</th>
		  			<th>Payment Status</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody className>
                                    {Array.from(userorders).map(order => (
                                        <tr key={order.id}>
            				<td>{order.order_id}</td>
					<td>{order.cart.map(ele =>
					<span key = {uuid()}>{ele.item_name} &nbsp; </span>
					)}</td>
					<td>{order.amount}</td>
					<td>{orderstatus[order.order_status]}</td>
					<td>{paystatus[order.payment_status]}</td>  
					 <td>
					 <LinkContainer to={`/order/${order.order_id}`}>
					<Button className='btn-sm'>Details</Button>
					 </LinkContainer>
					 </td>
					    </tr>
                                    ))}
                                </tbody>
                            </Table>

	  )  : "LOADING......"} 
</Col>
      </Row>
    </Container>
  );
}
export default ProfileScreen;
