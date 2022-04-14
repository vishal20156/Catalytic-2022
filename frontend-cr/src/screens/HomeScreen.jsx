import React from "react";
import ProductData from "../ProductData.js";
import { useState, useEffect } from 'react'
import Product from "../comps/Product.jsx";
import { StateType , useDispatch,useSelector} from 'react-redux'
import { listProduct } from '../actions/productActions'
import { getlatlong } from "pincode-lat-long"
import { getByLabelText } from "@testing-library/dom";
import haversine from "haversine-distance"
const HomeScreen = () => {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList);
  const { loading, products} = productList
  useEffect(()=>{
    dispatch(listProduct())
  },[])
  
  const getSourceCoordinates = (src) => {
      let { lat, long } = getlatlong(src)
      let latA = lat
      let longA = long
      return { latA, longA }
  }
 
  const getDestinationCoordinates = (dest) => {
    let { lat, long } = getlatlong(dest)
    let latB = lat
    let longB = long
    return { latB, longB }
}

 const degtoRed = (deg) => {
    const PI = Math.PI
    return deg * (PI/180)
 }





function haversinef(lat1, lon1, lat2, lon2)
    {
        // distance between latitudes
        // and longitudes
        let dLat = (lat2 - lat1) * Math.PI / 180.0;
        let dLon = (lon2 - lon1) * Math.PI / 180.0;
           
        // convert to radiansa
        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;
         
        // apply formulae
        let a = Math.pow(Math.sin(dLat / 2), 2) +
                   Math.pow(Math.sin(dLon / 2), 2) *
                   Math.cos(lat1) *
                   Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c;
         
    }
 
const {latA,longA} = getSourceCoordinates(400093)
const {latB,longB} = getDestinationCoordinates(400020)



// console.log({latA,longA})
console.log({latB,longB})
// const products = []
  return (
    <>
      <header>
        <div className="wrapper-row">
          <div className="wrapper-col-1">
            <h1 className="slide-animation animate__animated animate__fadeIn animate__slow	3s">
              Got sugar cravings but worried about your health? We have got you
              all covered!
            </h1>
            <p>
              We at <strong>Catalytic Rasoi</strong> provide evidence-based
              Expert written nutirition content that fits your lifestyle and
              preferences.
            </p>
            <a href="#" className="btn">
              Order Now &#10230;
            </a>
          </div>

          <div className="wrapper-col-2">
            <img src="./Images/header.jpeg" />
          </div>
        </div>
      </header>
      <h2 className="title" id="usphere">
        About us
      </h2>
      <div className="wrapper-row mt-4" id="usp">
        <div className="wrapper-col-1">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3000">
                <img src="Images/1.svg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src="Images/2.svg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src="Images/3.svg" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="wrapper-col-1">
          <h2 className="usp-heading display-4">What we do?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
            deleniti ex aliquam consequatur fugiat quibusdam impedit
            consequuntur quos iste eligendi incidunt non libero, facilis animi
            optio dolore cupiditate, nobis temporibus!
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="small-container">
        <h2 className="title" id="products">
          Products
        </h2>
        
        <div className="wrapper-row">
          {products.map((product) => (
            
            <div key={product.id} className="wrapper-col-4">
        
              <Product key={product.id} product={product} category = {product.category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
