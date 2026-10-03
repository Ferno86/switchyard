// Cart totals are always calculated from the cartItems array held in App's state.
export const cartCount = (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity, 0);

export const cartSubtotal = (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
