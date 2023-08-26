import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {getCartTotal} from '../Redux/Slice/product'


const Header = () => {
    const {cart, totalQty} = useSelector((state)=>state.product);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCartTotal());
      },[cart])
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <span  className="brand-logo"><Link to="/">ShoppingCart</Link></span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/favorite"><i className="material-icons" style={{fontSize:"28px",color:"white"}}>favorite</i></Link></li>
                        <li><Link to="/cart">Cart({totalQty})</Link></li>                      
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;