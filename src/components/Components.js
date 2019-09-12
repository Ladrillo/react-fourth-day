import React from 'react';

function createStyle() {
  return {
    container: {
      padding: '5px',
      margin: '2px',
      border: '2px solid grey',
    },
    span: {
      color: 'blue'
    },
    button: {
      border: '1px solid grey',
      borderRadius: '4px',
    },
  };
}

export function ItemDisplay(props) {
  const { name, action } = props;
  const styles = createStyle();
  return (
    <div style={styles.container} className="item-display">
      <span style={styles.span}>{name}</span>
      <button style={styles.button} onClick={evt => action(name)}>Add Item to Cart</button>
    </div>
  );
}

export function ItemsList(props) {
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

export function Cart(props) {
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
