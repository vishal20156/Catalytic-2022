import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions'

function UserListScreen() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
console.log(userInfo)
    // const userDelete = useSelector(state => state.userDelete)
    // const { success: successDelete } = userDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, userInfo])


    const deleteHandler = (id) => {

        // if (window.confirm('Are you sure you want to delete this user?')) {
        //     dispatch(deleteUser(id))
        // }
    }

    return (
        <div>
            <h1 className='text-center'>Customers</h1>
            {loading
                ? (<h1>"OK"</h1>)
                : error
                    ? (<h1>{error}</h1>)
                    : (
                        <div className='container'>

<Table  bordered responsive  className='table-sm text-dark'>
                            <thead style={{backgroundColor:"black"}}>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                            </div>
                      
                    )}
        </div>
    )
}

export default UserListScreen