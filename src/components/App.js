import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const fruitsApi = 'http://localhost:4000/market/fruits';
const meatsApi = 'http://localhost:4000/market/meats';

function ItemDisplay(props) { // PULL OUT OF HERE!
  const { name, action } = props;
  return (
    <div className="item-display">
      <span>{name}</span>
      <button onClick={evt => action(name)}>Add Item to Cart</button>
    </div>
  );
}

function ItemsList(props) { // PULL OUT OF HERE!
  const { items, addToCart } = props;
  return (
    <div className="items-list">
      <h4>Stock:</h4>
      {
        items.map(
          (itemName) => (
            <ItemDisplay
              key={itemName}
              name={itemName}
              action={addToCart}
            />
          ))
      }
    </div>
  )
}

function Cart(props) { // PULL OUT OF HERE!
  const { items } = props;
  return (
    <div className="cart">
      <h4>Cart:</h4>
      {
        items.length
          ? items.map((item, idx) => <div key={idx}>{item}</div>)
          : <h5>Nothing in the cart. Sad!</h5>
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
      <ItemsList
        items={stock.fruits.concat(stock.meats)}
        addToCart={addToCart}
      />
      <Cart items={cart} />
    </div>
  );
}

export default Market;
