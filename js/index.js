import { fetchProducts } from "./api.js";
import { updateCartCount } from "./cart.js";

const productsContainer = document.querySelector("#products-container");
const loader = document.querySelector("#loader");
const errorMessage = document.querySelector("#error-message");
const genreFilter = document.querySelector("#genre-filter");

let allProducts = [];

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
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

function createProductCard(product) {
  const imageUrl = product.image?.url || "";
  const imageAlt = product.image?.alt || product.title;

  return `
    <article class="product-card">
      <img src="${imageUrl}" alt="${imageAlt}" />
      <h3>${product.title}</h3>
      <p><strong>Genre:</strong> ${product.genre}</p>
      ${createPriceHtml(product)}
      <a href="/product/index.html?id=${product.id}">View product</a>
    </article>
  `;
}

function displayProducts(products) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  const productCards = products.map(createProductCard).join("");
  productsContainer.innerHTML = productCards;
}

function createGenreOptions(products) {
  const genres = products.map(function (product) {
    return product.genre;
  });

  const uniqueGenres = [...new Set(genres)];

  uniqueGenres.forEach(function (genre) {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function filterProductsByGenre() {
  const selectedGenre = genreFilter.value;

  if (selectedGenre === "all") {
    displayProducts(allProducts);
    return;
  }

  const filteredProducts = allProducts.filter(function (product) {
    return product.genre === selectedGenre;
  });

  displayProducts(filteredProducts);
}

async function initializeHomepage() {
  showLoader();
  clearError();

  try {
    allProducts = await fetchProducts();
    displayProducts(allProducts);
    createGenreOptions(allProducts);
  } catch (error) {
    showError("Sorry, we could not load the products. Please try again later.");
  } finally {
    hideLoader();
  }
}

genreFilter.addEventListener("change", filterProductsByGenre);

updateCartCount();
initializeHomepage();