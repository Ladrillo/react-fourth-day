import React from 'react';
import styled from 'styled-components';
// import st from '../styles';
// you do this all day long in React Native
// function createStyle(isBold, name) {
//   return {
//     container: {
//       padding: st.container.padding,
//       margin: '2px',
//       border: '2px solid grey',
//     },
//     span: {
//       color: name.length % 2 === 0 ? 'blue' : 'red',
//       fontWeight: isBold ? 'bold' : 'initial'
//     },
//     button: {
//       border: '1px solid grey',
//       borderRadius: '4px',
//     },
//   };
// }

// export function ItemDisplay(props) {
//   const { name, action, isBold } = props;
//   const styles = createStyle(isBold, name);
//   return (
//     <div style={styles.container} className="item-display">
//       <span style={styles.span}>{name}</span>
//       <button style={styles.button} onClick={evt => action(name)}>Add Item to Cart</button>
//     </div>
//   );
// }

export function ItemDisplay(props) {
  const { name, action } = props;
  return (
    <div className="item-display">
      <span>{name}</span>
      <button onClick={evt => action(name)}>Add Item to Cart</button>
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

// styled is imported at the top
// we can use actual CSS syntax
// but it's still all JS
// no inline styles
// the lib splaps very unique classnames to the elements
// a style tag gets injected to the page with CSS rules
// targeting those very unique classnames
const StyledH5 = styled.h5`
  color: red;
`;

const StyledH4 = styled.h4`
  font-weight: bold;
  color: green;
  font-style: italic;
`

const StyledH4WithAnExtra = styled(StyledH4)`
  color: purple;
`

export function Cart(props) {
  const { items } = props;
  return (
    <div className="cart">
      <StyledH4WithAnExtra>Cart:</StyledH4WithAnExtra>
      {
        items.length
          ? items.map((item, idx) => <div key={idx}>{item}</div>)
          : <StyledH5>Nothing in the cart. Sad!</StyledH5>
      }
    </div>
  )
}

// export default {
//   ItemDisplay,
//   ItemsList,
//   Cart,
// }
