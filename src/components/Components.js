import React from 'react';

// you do this all day long in React Native
function createStyle(isBold, name) {
  return {
    container: {
      padding: '5px',
      margin: '2px',
      border: '2px solid grey',
    },
    span: {
      color: name.length % 2 === 0 ? 'blue' : 'red',
      fontWeight: isBold ? 'bold' : 'initial'
    },
    button: {
      border: '1px solid grey',
      borderRadius: '4px',
    },
  };
}

export function ItemDisplay(props) {
  const { name, action, isBold } = props;
  const styles = createStyle(isBold, name);
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
              isBold={true}
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
