import React from 'react';

function createStyle() {
  return {
    container: {

    },
    span: {

    },
    button: {

    },
  }
}

export function ItemDisplay(props) { // PULL OUT OF HERE!
  const { name, action } = props;
  return (
    <div className="item-display">
      <span>{name}</span>
      <button onClick={evt => action(name)}>Add Item to Cart</button>
    </div>
  );
}

export function ItemsList(props) { // PULL OUT OF HERE!
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

export function Cart(props) { // PULL OUT OF HERE!
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

// export default {
//   ItemDisplay,
//   ItemsList,
//   Cart,
// }