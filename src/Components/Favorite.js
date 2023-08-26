import React from "react";
import Header from "./Header";
import {addToCart} from "../Redux/Slice/product";
import { useSelector,useDispatch } from "react-redux";

const Favorite = () => {
    const dispatch = useDispatch();
    const { fav } = useSelector((state) => state.product);

    return (
        <div>
            <Header />
            <div className="row">
                {
                    fav.map((item) => (
                        <div className="col s12 m3" style={{ marginTop: "20px" }}>
                            <div className="card medium">
                                <div className="card-image">
                                    <img src={item.image} />
                                </div>
                                <div className="card-content">
                                    <span className="card-title" style={{ fontSize: "20px", color: "black", marginTop: "10px" }}>{item.title}</span>
                                    <button className='add-to-cart-btn' onClick={() => dispatch(addToCart(item))}><i className="small material-icons" id='add-icon'>add</i></button>
                                    <p className='card-price'>$ {item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default Favorite;