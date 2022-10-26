import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from '../actions/userActions'
const Header = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
    return(
         <>
      <div className="wrap-container">
        <div className="navbar">
          <div className="logo">
            <span className="brand-title text-uppercase">Catalytic Rasoi</span>
          </div>

          <nav>
            <ul>
              <li>
                <Link to = "/home">Home</Link>
              </li>
              <li>
                   <a href = "#">Products</a>
              </li>
              <li>
                    <a href = "#">About us</a>
              </li>


              {userInfo ? (
                <>
               <li><Link to = "profile/">My Profile</Link></li>
               
               <li onClick = {logoutHandler}>Logout</li>
               </>
              ) : (

                <li>
                <Link to="/login" className="btn-custom">
                  Login
                </Link>
              </li>
              )} 
              
            
              <li>
                    <Link to="/cart" className="btn-custom">
                  Cart
                </Link>
               
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
    </>
    )
}



export default Header;