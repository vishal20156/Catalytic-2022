import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../actions/orderActions'
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import Form from 'react-bootstrap/Form';
import { updateOrderStatusAdmin } from '../actions/orderActions'



function OrderListScreen() {
    const orderstatusDict = { 1: "Not Packed", 2: "Ready For Shipment", 3: "Shipped", 4: "Delivered" }
    const paystatusDict = { 1: "Pending", 2: "Failure", 3: "Success" }
    const [orderUpdateId, setOrderUpdateId] = useState(0);
    const [changedStatus, setChangedStatus] = useState(0);
    const dispatch = useDispatch()
    const history = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (oid) => {
        setShow(true)
        setOrderUpdateId(oid);

    };

    const handleUpdateStatus = () => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(updateOrderStatusAdmin(orderUpdateId, changedStatus))
            setShow(false);
        }
    }

    const notifyUser = () => {


        // Regex expression to remove all characters which are NOT alphanumeric
        let number = +917977209512
        // Appending the phone number to the URL
        let url = `https://web.whatsapp.com/send?phone=${number}`;

        // Appending the message to the URL by encoding it
        url += `&text=${encodeURI("Delivered")}&app_absent=0`;

        // Open our newly created URL in a new tab to send the message
        window.open(url);



    }

    const orderList = useSelector(state => state.orderAllList)
    const changeOrderStatus = useSelector(state => state.orderUpdate);
    const { updatingOrderStatus, success } = changeOrderStatus;
    const [selected, setSelected] = useState(1);


    let { loading, error, orders } = orderList
    const [ordersstate, setOrdersState] = useState([]);

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin




    const filterOrder = (e) => {
        let selected = e.target.value
        if (selected === "") {
            setOrdersState(orders)
        }

        let ord = orders.filter((obj) => {
            return obj.order_status === Number(selected)
        })

        setOrdersState(ord);




    }
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getOrders())
            setOrdersState(orders);
            console.log(orders);
        } else {
            history('/login')
        }

    }, [dispatch, history, userInfo, success])


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Select
                        onChange={e => {
                            setChangedStatus(e.target.value)

                        }}
                        aria-label="Default select example">
                        <option>Choose Order Status</option>
                        <option value="1">Not Packed</option>
                        <option value="2">Ready For Shipment</option>
                        <option value="3">Shipped</option>
                        <option value="4">Delivered</option>

                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateStatus}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={notifyUser}>Notify User</Button>
                </Modal.Footer>
            </Modal>
            <h1 className="text-center">Orders</h1>
            {loading
                ? (<h1>Loading...</h1>)
                : error
                    ? (<h1>{error}</h1>)
                    : (
                        <div className='container'>

                            <div>
                                <strong>Filters: </strong>
                                <select onChange={filterOrder}>
                                    <option value="1">Not Packed</option>
                                    <option value="2">Ready For Shipment</option>
                                    <option value="3">Shipped</option>
                                    <option value="4">Delivered</option>

                                </select>
                            </div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead style={{ backgroundColor: "black" }}>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>Total</th>
                                        <th>Payment Status</th>
                                        <th>Order Status</th>


                                        <th>Details</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        ordersstate.length > 0 ? ordersstate.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.user && order.user.first_name}</td>
                                                <td>{order.timestamp_created_at.substring(0, 10)}</td>
                                                <td>Rs. {order.amount}</td>
                                                <td>{paystatusDict[order.payment_status]}</td>

                                                <td>{orderstatusDict[order.order_status]}
                                                    <span id={order.id} style={{ float: "right" }}><Button variant="danger" onClick={() => handleShow(order.id)}>Edit</Button></span>
                                                </td>



                                                <td>
                                                    <LinkContainer to={`/order/${order.order_id}`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            Details
                                                        </Button>
                                                    </LinkContainer>


                                                </td>
                                            </tr>
                                        )) : orders.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.user && order.user.first_name}</td>
                                                <td>{order.timestamp_created_at.substring(0, 10)}</td>
                                                <td>Rs. {order.amount}</td>
                                                <td>{paystatusDict[order.payment_status]}</td>

                                                <td>{orderstatusDict[order.order_status]}
                                                    <span id={order.id} style={{ float: "right" }}><Button variant="danger" onClick={() => handleShow(order.id)}>Edit</Button></span>
                                                </td>



                                                <td>
                                                    <LinkContainer to={`/order/${order.order_id}`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            Details
                                                        </Button>
                                                    </LinkContainer>


                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </div>

                    )}
        </div>
    )
}

export default OrderListScreen