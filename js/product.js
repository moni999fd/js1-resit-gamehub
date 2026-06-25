import { fetchProductById } from "./api.js";
import { addToCart, updateCartCount } from "./cart.js";

const productContainer = document.querySelector("#product-container");
const loader = document.querySelector("#loader");
const errorMessage = document.querySelector("#error-message");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError(message) {
  errorMessage.textContent = message;
}

function createPriceHtml(product) {
  if (product.onSale && product.discountedPrice < product.price) {
    return `
      <p><strong>Sale price:</strong> $${product.discountedPrice}</p>
      <p><s>$${product.price}</s></p>
    `;
  }

  return `<p><strong>Price:</strong> $${product.price}</p>`;
}

function displayProduct(product) {
  const imageUrl = product.image?.url || "";
  const imageAlt = product.image?.alt || product.title;

  productContainer.innerHTML = `
    <article class="product-detail">
      <img src="${imageUrl}" alt="${imageAlt}" />

      <div>
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p><strong>Genre:</strong> ${product.genre}</p>
        <p><strong>Age rating:</strong> ${product.ageRating}</p>
        <p><strong>Released:</strong> ${product.released}</p>
        ${createPriceHtml(product)}
        <button id="add-to-cart-button">Add to basket</button>
        <p id="cart-message" class="cart-message" aria-live="polite"></p>
      </div>
    </article>
  `;

  const addToCartButton = document.querySelector("#add-to-cart-button");
  const cartMessage = document.querySelector("#cart-message");

  addToCartButton.addEventListener("click", function () {
    addToCart(product);
    updateCartCount();
    cartMessage.textContent = `${product.title} was added to your basket.`;
  });
}

async function initializeProductPage() {
  showLoader();

  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const productId = params.get("id");

  if (!productId) {
    hideLoader();
    showError("No product ID was found.");
    return;
  }

  try {
    const product = await fetchProductById(productId);
    displayProduct(product);
  } catch (error) {
    showError("Sorry, we could not load this product. Please try again later.");
  } finally {
    hideLoader();
  }
}

initializeProductPage();updateCartCount();
initializeProductPage();