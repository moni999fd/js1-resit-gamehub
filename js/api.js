import { API_BASE_URL } from "./constants.js";

export async function fetchProducts() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Could not fetch products.");
  }

  const result = await response.json();

  return result.data;
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Could not fetch product.");
  }

  const result = await response.json();

  return result.data;
}