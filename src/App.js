import { React } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import './App.css';
import CartPage from './Components/CartPage';
import ProductPage from './Components/Productpage';
import Favorite from './Components/Favorite';

function App() {
  return (
    <BrowserRouter>
    <div className="App">   
       <Routes>
          <Route exact path='/' element={<ProductPage/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/favorite' element={<Favorite/>} />
       </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
