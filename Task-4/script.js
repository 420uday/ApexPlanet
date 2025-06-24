const products = [
  { name: "Smartphone", category: "electronics", price: 599, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 999, rating: 4.8 },
  { name: "T-shirt", category: "clothing", price: 25, rating: 4.0 },
  { name: "Novel", category: "books", price: 15, rating: 4.2 },
  { name: "Jeans", category: "clothing", price: 40, rating: 3.8 },
  { name: "Headphones", category: "electronics", price: 199, rating: 4.6 },
  { name: "Cookbook", category: "books", price: 30, rating: 4.1 }
];

function renderProducts(productList) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  if (productList.length === 0) {
    container.innerHTML = "<p>No products match your filters.</p>";
    return;
  }

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p class="category">${product.category}</p>
      <p class="price">$${product.price}</p>
      <p class="rating">⭐ ${product.rating}</p>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const category = document.getElementById("categoryFilter").value;
  const maxPrice = parseFloat(document.getElementById("priceFilter").value);
  const sortOrder = document.getElementById("sortFilter").value;

  let filtered = [...products];

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (!isNaN(maxPrice)) {
    filtered = filtered.filter(p => p.price <= maxPrice);
  }

  if (sortOrder === "high") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortOrder === "low") {
    filtered.sort((a, b) => a.rating - b.rating);
  }

  renderProducts(filtered);
}

// Initial load
renderProducts(products);
