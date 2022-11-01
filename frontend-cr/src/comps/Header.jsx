import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../actions/userActions'
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <>

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="text-success">Catalytic Rasoi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-secondary">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/#products">Products</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
              {userInfo ? (
                <>
                  <Nav.Link><Link to="profile/">My Profile</Link></Nav.Link>

                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </>
              ) : (

                <Nav.Link>
                  <Link to="/login" className="btn-custom">
                    Login
                  </Link>
                </Nav.Link>

              )}

              <Nav.Link>
                <Link to="/cart" className="btn-custom">
                  Cart
                </Link>

              </Nav.Link>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenue'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                   <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item disabled>Products <Badge pill bg="warning">Coming soon</Badge> </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>




    </>
  )
}



export default Header;