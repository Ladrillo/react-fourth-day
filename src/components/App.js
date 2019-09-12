import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const fruitsApi = 'http://localhost:4000/market/fruits';
const meatsApi = 'http://localhost:4000/market/meats';

function ItemDisplay(props) {
  const { name, addToCart } = props;
  return (
    <div className="item-display">
      <span>{name}</span>
      <button onClick={evt => addToCart(name)}>Add Item to Cart</button>
    </div>
  );
}

function ItemsList(props) {
  const { items, addToCart } = props;
  return (
    <div className="items-list">
      {
        items.map(
          (itemName) => (
            <ItemDisplay
              key={itemName}
              name={itemName}
              addToCart={addToCart}
            />
          ))
      }
    </div>
  )
}

function Cart(props) {
  const { items } = props;
  return (
    <div className="cart">
      <h3>Cart:</h3>
      {
        items.length
          ? items.map((item, idx) => <div key={idx}>{item}</div>)
          : <div>Nothing in the cart. Sad!</div>
      }
    </div>
  )
}

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
      <ItemsList items={stock.fruits} addToCart={addToCart} />
      <ItemsList items={stock.meats} addToCart={addToCart} />
      <Cart items={cart} />
    </div>
  );
}

export default Market;
