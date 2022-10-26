import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../comps/FormContainer'
import { CheckoutSteps } from '../comps/CheckoutSteps'
import {useNavigate } from "react-router-dom"
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const history = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('')

    if (!shippingAddress.address) {
        history('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Cash on Delivery'
                            id='cod'
                            value = 'cod'
                            name='paymentMethod'
                            
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                 
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen