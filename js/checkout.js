import {
  getCart,
  removeFromCart,
  getCartTotal,
  getProductPrice,
  updateCartCount,
} from "./cart.js";

const checkoutContainer = document.querySelector("#checkout-container");

function displayEmptyCart() {
  checkoutContainer.innerHTML = `
    <div class="checkout-box">
      <h2>Your basket is empty</h2>
      <p>You have not added any games yet.</p>
      <a href="../" class="button-link">Browse games</a>
    </div>
  `;
}

function createCartItemHtml(product) {
  const imageUrl = product.image?.url || "";
  const imageAlt = product.image?.alt || product.title;
  const productPrice = getProductPrice(product);
  const itemTotal = productPrice * product.quantity;

  return `
    <article class="cart-item">
      <img src="${imageUrl}" alt="${imageAlt}" />

      <div>
        <h2>${product.title}</h2>
        <p><strong>Genre:</strong> ${product.genre}</p>
        <p><strong>Price:</strong> $${productPrice.toFixed(2)}</p>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        <p><strong>Item total:</strong> $${itemTotal.toFixed(2)}</p>
        <button class="remove-button" data-id="${product.id}">Remove</button>
      </div>
    </article>
  `;
}

function displayCart() {
  const cart = getCart();

  updateCartCount();

  if (cart.length === 0) {
    displayEmptyCart();
    return;
  }

  const cartItems = cart.map(createCartItemHtml).join("");
  const cartTotal = getCartTotal();

  checkoutContainer.innerHTML = `
    <div class="checkout-grid">
      <section class="cart-items">
        ${cartItems}
      </section>

      <aside class="order-summary">
        <h2>Order Summary</h2>
        <p><strong>Total:</strong> $${cartTotal.toFixed(2)}</p>
        <a href="confirmation/" class="button-link">Complete order</a>
      </aside>
    </div>
  `;

  const removeButtons = document.querySelectorAll(".remove-button");

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productId = button.dataset.id;
      removeFromCart(productId);
      displayCart();
    });
  });
}

displayCart();