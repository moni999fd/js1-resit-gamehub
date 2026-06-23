const CART_KEY = "gamehub-cart";

export function getCart() {
  const cart = localStorage.getItem(CART_KEY);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find(function (cartItem) {
    return cartItem.id === product.id;
  });

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function removeFromCart(productId) {
  const cart = getCart();

  const updatedCart = cart.filter(function (cartItem) {
    return cartItem.id !== productId;
  });

  saveCart(updatedCart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

export function getProductPrice(product) {
  if (product.onSale && product.discountedPrice < product.price) {
    return product.discountedPrice;
  }

  return product.price;
}

export function getCartTotal() {
  const cart = getCart();

  return cart.reduce(function (total, product) {
    return total + getProductPrice(product) * product.quantity;
  }, 0);
}

export function getCartItemCount() {
  const cart = getCart();

  return cart.reduce(function (total, product) {
    return total + product.quantity;
  }, 0);
}

export function updateCartCount() {
  const cartCount = document.querySelector("#cart-count");

  if (!cartCount) {
    return;
  }

  cartCount.textContent = getCartItemCount();
}