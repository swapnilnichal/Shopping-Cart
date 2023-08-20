import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {getCartTotal,removeItem,increaseQty,decreaseQty} from '../Redux/Slice/product';
import Header from "./Header";

const CartPage = () => {
  const { cart, totalQty, totalPrice } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  dispatch(getCartTotal());

  return (
    <div>
      <Header />
      <div class="row" style={{ marginTop: "15px" }}>
        <div class="col s8">
          <ul class="collection">
            {
              cart.map((item) => (
                    <li class="collection-item avatar">
                      <div class="row" >
                        <div class="col s2">
                           <img className="cart-product-img" src={item.image} />
                        </div>
                        <div className="col s6">
                        <div className="row" >
                        <div className="col s6">
                          <span className="title">{item.title}</span>
                        </div>
                        <div className="col s6">
                        <a className="btn-floating btn-medium waves-effect waves-light red" onClick={()=> dispatch(removeItem(item.id))}>
                          <i className="material-icons">delete</i>
                        </a>
                        </div>                          
                        </div>
                        </div>
                        <div className="col s4">
                           <div className="qty-add-minus-div">
                               <button className="Plus-btn" onClick={()=>dispatch(increaseQty(item.id))}><i className="material-icons" style={{fontSize:"18px",color:"white"}}>add</i></button>
                               <input type="text" style={{width :"60px",margin:"0 10px"}} value={item.quantity}></input>
                               <button className="minus-btn" onClick={()=>dispatch(decreaseQty(item.id))}><i className="material-icons" style={{fontSize:"18px",color:"white"}}>remove</i></button>
                               <div className="bill-price" style={{margin:"20px 20px"}}>$ {item.price}</div>
                            </div>
                        </div>
                      </div>
                    </li>
              ))
            }
          </ul>
        </div>
        <div class="col s4">
          <div class="row">
            <div class="col s12 m11">
              <div class="card">
                <div class="card-content">
                  <span className="card-title summary">Summary</span>
                  <div className="bill"><span className="bill-tagname">Total Items</span><span>{totalQty}</span></div>
                  <div className="bill"><span className="bill-tagname">Total Price</span><span className="bill-price">{totalPrice}</span></div>
                </div>
                <div class="card-action">
                  <a class="waves-effect waves-light btn chekout">Go to Checkout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage;