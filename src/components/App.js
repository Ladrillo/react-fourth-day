import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cart, ItemsList } from './Components';
import './App.css';

const fruitsApi = 'http://localhost:4000/market/fruits';
const meatsApi = 'http://localhost:4000/market/meats';

function Market() {
  // slices of state
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [stock, setStock] = useState({
    fruits: [],
    meats: [],
  });

  // function that actuates on one (or several) slices of state
  const addToCart = (item) => {
    setCart(cart.concat(item));
  };

  // side effect after DOM surgery is done for first render
  useEffect(() => {
    const fruitsPromise = axios.get(fruitsApi);
    const meatsPromise = axios.get(meatsApi);

    Promise.all([fruitsPromise, meatsPromise])
      .then(([fruitsAxiosRes, meatsAxiosRes]) => {
        setStock({
          fruits: fruitsAxiosRes.data,
          meats: meatsAxiosRes.data,
        });
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="App">
      <span className="error">{error}</span>
      <ItemsList
        items={stock.fruits.concat(stock.meats)}
        addToCart={addToCart}
      />
      <Cart items={cart} />
    </div>
  );
}

export default Market;
