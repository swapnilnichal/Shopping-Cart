import { React } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import './App.css';
import CartPage from './Components/CartPage';
import ProductPage from './Components/Productpage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">   
       <Routes>
          <Route exact path='/' element={<ProductPage/>} />
          <Route path='/cart' element={<CartPage/>} />
       </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
