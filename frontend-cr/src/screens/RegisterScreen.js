import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../comps/FormContainer'
import { register } from '../actions/userActions'
import { useNavigate } from "react-router-dom"
import { Message } from "../comps/Message"

function RegisterScreen(){
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [contact,setContact] = useState('')

    const dispatch = useDispatch()
    const history= useNavigate();

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/home'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match")
        }
        else{
            dispatch(register(name,email, password,contact))
        }

    }
    return(
        <FormContainer>
            <h1>Sign up</h1>
            {message && <Message variant = "danger">{message}</Message>}
            {error && <Message variant = "danger">{error}</Message>}
            <Form onSubmit = {submitHandler}>
                
            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
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
            <Form.Group controlId='contact'>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                    required
                        type='tel'
                        placeholder='Enter Contact Number'
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    required
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
                    required
                        type='password'
                        placeholder='Enter Password Again'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                     Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/register'}>
                        Sign In
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
