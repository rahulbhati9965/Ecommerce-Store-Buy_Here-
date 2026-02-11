// export const addDecimals = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };

// export const updateCart = (state) => {
//   state.itemsPrice = addDecimals(
//     state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );

//   state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

//   state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

//   state.totalPrice = (
//     Number(state.itemsPrice) +
//     Number(state.shippingPrice) +
//     Number(state.taxPrice)
//   ).toFixed(2);

//   localStorage.setItem("cart", JSON.stringify(state));
//   return state;
// };

export const addDecimals = (num) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state) => {
  // Items price = sum of all item subtotals
  const itemsTotal = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  state.itemsPrice = addDecimals(itemsTotal);

  // Shipping: free over ₹100
  const shipping = state.itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shipping);

  // Tax: 15% of item price
  const tax = 0.15 * state.itemsPrice;
  state.taxPrice = addDecimals(tax);

  // Total price
  const total = state.itemsPrice + state.shippingPrice + state.taxPrice;
  state.totalPrice = addDecimals(total);

  // Store in localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
