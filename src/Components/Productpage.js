import { React, useEffect } from "react";
import Header from "./Header";
// redux related
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct} from '../Redux/Slice/product';
import {addToCart} from '../Redux/Slice/product'
//

    const ProductPage = () => {
        const dispatch = useDispatch();
        const state = useSelector((state) => state);
        console.log("state", state);

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
                                        <span className="card-title" style={{ fontSize: "20px", color: "black", marginTop: "10px" }}>{e.title}</span>
                                        <button className='add-to-cart-btn' onClick={() => dispatch(addToCart(e))}><i className="small material-icons" id='add-icon'>add</i></button>
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