import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Message } from "../comps/Message";
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import Spinner from 'react-bootstrap/Spinner';
function ProfileScreen() {
  const history = useNavigate();
  const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success,updatingStatus } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        }
        else{
            if(!user.name){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                if(!success){
                    dispatch(getUserDetails())
                }
                
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch,history, userInfo,user,success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
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
        <Col md={3}>
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
        <Col md={9}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </Container>
  );
}
export default ProfileScreen;
