
import './App.css';
import Header from './comps/Header.jsx'
import Footer from './comps/Footer.jsx'
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen'
import {Routes, Route } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen"
import OrderListScreen from "./screens/OrderListScreen"
function App() {
  return (
   <>
   <Header/>
   <Routes>
    <Route exact path = "/" element = {<HomeScreen/>}/>
    <Route exact path = "/home" element = {<HomeScreen/>}/>
    <Route path = "/login" element = {<LoginScreen/>}/>
    <Route path = "/register" element = {<RegisterScreen/>}/>
    <Route path = "/profile" element = {<ProfileScreen/>}/>
    <Route path = "/shipping" element = {<ShippingScreen/>}/>
    <Route path = "/payment" element = {<PaymentScreen/>}/>
    <Route path = "/placeorder" element = {<PlaceOrderScreen/>}/>
    <Route path = "/product/:id" element = {<ProductScreen/>}/>
    <Route path="/order/:id" element={<OrderScreen/>} />
    <Route path = "/cart/" element = {<CartScreen/>}>
    <Route path = ":id" element = {<CartScreen/>}/>


    </Route>


    <Route path = "/admin/userlist" element = {<UserListScreen/>}/>

    <Route path = "/admin/orderList" element = {<OrderListScreen/>}/>

   </Routes>
   <Footer/>
   </>
  );
}

export default App;
