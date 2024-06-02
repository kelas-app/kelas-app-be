document
  .getElementById("addToCartForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      productId: document.getElementById("cartProductId").value,
      quantity: document.getElementById("cartQuantity").value,
    };
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const cartOutput = document.getElementById("cartOutput");
    cartOutput.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  });

document.getElementById("viewCart").addEventListener("click", async () => {
  const response = await fetch("/api/cart");
  const result = await response.json();
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  result.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.textContent = `${item.product.name} - ${item.quantity}`;
    cartItems.appendChild(cartItem);
  });
});

// HTML
// Add this inside the addToCartForm
// <div id="cartOutput"></div>
