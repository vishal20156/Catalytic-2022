import React from "react";
import { useEffect } from 'react'
import Product from "../comps/Product.jsx";
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux'
import { listProduct, listCat } from '../actions/productActions'
import { getlatlong } from "pincode-lat-long"
const HomeScreen = () => {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)

  const { loading, products } = productList
  const category = { 1: 'Box of Happiness',2:'Mini Hampers'}
  const ids = [...Object.keys(category)]
  const styleTitle= { flex : "0 0 100%"}

  
    
  // useEffect(() => {

  //   dispatch(listCat())



  // }, [])
  useEffect(() => {

    dispatch(listProduct())



  }, [])





  // const products = []
  return (
    <>
      <header>
        {

        }
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
        


        {ids.map((id) => {
          return (
            <div className="wrapper-row">
              <div className="text-center mb-4"style={styleTitle}>
              <h4>{category[id]}</h4>         
                </div>
                { products.filter(product => Number(product.category) == id).map((ele) => {
                  return( <div key={ele.id} className="wrapper-col-4">

                   <Product key={ele.id} product={ele} category={ele.category} />
                  
              </div>
                 )
                })}
              </div>


          )
        })}

      </div>

    </>
  );
};

export default HomeScreen;
