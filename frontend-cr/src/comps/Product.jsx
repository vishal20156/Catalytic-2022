import { Link } from "react-router-dom";
const Product = ({ product }) => {
    const baseURL = "http://127.0.0.1:8000"
    return(<div>
    
    <Link to = {`/product/${product.id}`}>
     <img src={baseURL + product.image}  />
            <h4 className = "mt-2">{product.name}</h4>
            <p>Rs {product.price}</p>
            <button className = "add-to-bag btn text-center">Add to bag</button>
    </Link>
    </div>)
}

export default Product;