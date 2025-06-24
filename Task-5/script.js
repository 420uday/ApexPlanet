const products = [
  { id: 1, name: "Smartphone", category: "electronics", price: 599, rating: 4.5, image: "images/phone.jpg" },
  { id: 2, name: "Laptop", category: "electronics", price: 999, rating: 4.8, image: "images/laptop.jpg" },
  { id: 3, name: "T-shirt", category: "clothing", price: 25, rating: 4.0, image: "images/tshirt.jpg" },
  { id: 4, name: "Novel", category: "books", price: 15, rating: 4.2, image: "images/book.jpg" },
  { id: 5, name: "Headphones", category: "electronics", price: 199, rating: 4.6, image: "images/headphones.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("categorySelect");
const cartCount = document.getElementById("cartCount");

function renderProducts(filteredProducts) {
  productList.innerHTML = "";

  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img loading="lazy" src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>$${product.price}</p>
      <p>⭐ ${product.rating}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(productId) {
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm) &&
    (selectedCategory === "all" || p.category === selectedCategory)
  );

  renderProducts(filtered);
}

// Event listeners
searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);

// Init
updateCartCount();
renderProducts(products);
