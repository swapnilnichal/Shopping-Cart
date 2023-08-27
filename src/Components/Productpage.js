import { React, useEffect,useState } from "react";

import Header from "./Header";
// redux related
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct} from '../Redux/Slice/product';
import {addToCart,addToFav} from '../Redux/Slice/product'
//

    const ProductPage = () => {
        const [favorites, setFavorites] = useState({});

        const dispatch = useDispatch();
        const state = useSelector((state) => state);
        console.log("state", state);

    // add to fav btn changes color when click functionality start here
        useEffect(() => {
            // Initialize favorites state with data from localStorage
            if (state.product.data) {
            const initialFavorites = {};
            state.product.data.forEach((product) => {
              const isFavorite = localStorage.getItem(product.id) === 'true';
              initialFavorites[product.id] = isFavorite;
            });
          
            setFavorites(initialFavorites);
           }
        }, [state.product.data]);

        function handleSpanClick(product) {
            const productId = product.id;
            const isFavorite = favorites[productId];
    
             setFavorites((prevFavorites) => ({
               ...prevFavorites,
               [productId]: !isFavorite,
             }));
    
             dispatch(addToFav(product));
             localStorage.setItem(productId, !isFavorite ? 'true' : 'false');
        }
    // add to fav btn changes color when click functionality end here

        useEffect(() => {
            dispatch(fetchProduct());
        }, [dispatch]);

        if (state.product.isLoading) {
            return <h3>Loading...</h3>
        }
  

        return (
            <div>
                <Header />
                <div className="row">
                    {
                        state.product.data && state.product.data.map((e) => (
                            <div className="col s12 m3" style={{ marginTop: "20px" }}>
                                <div className="card medium">
                                    <div className="card-image">
                                        <img src={e.image} />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title" style={{ fontSize: "20px", color: "black", marginTop: "10px" }}>
                                            {e.title}
                                        </span>
                                        <button className='add-to-cart-btn' onClick={() => dispatch(addToCart(e))}>
                                            <i className="small material-icons" id='add-icon'>add</i>
                                        </button>
                                        <span className="add-to-fav" onClick={()=>handleSpanClick(e)}>
                                            <i className={`small material-icons`} id={favorites[e.id] ? 'heartBtn' : ''}>favorite</i>
                                        </span>
                                        <p className='card-price'>$ {e.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    export default ProductPage;