document
  .getElementById("createOrderForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      buyerId: document.getElementById("orderBuyerId").value,
      sellerId: document.getElementById("orderSellerId").value,
      productId: document.getElementById("orderProductId").value,
      quantity: document.getElementById("orderQuantity").value,
      totalPrice: document.getElementById("orderTotalPrice").value,
      status: document.getElementById("orderStatus").value,
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const orderOutput = document.getElementById("orderOutput");
    orderOutput.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  });

document.getElementById("getAllOrders").addEventListener("click", async () => {
  const response = await fetch("/api/orders");
  const result = await response.json();
  const orderList = document.getElementById("ordersList");
  orderList.innerHTML = "";
  result.forEach((order) => {
    const orderItem = document.createElement("div");
    orderItem.textContent = `Order ID: ${order._id} - Status: ${order.status}`;
    orderList.appendChild(orderItem);
  });
});

// HTML
// Add this inside the createOrderForm
// <div id="orderOutput"></div>
