document
  .getElementById("createProductForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", document.getElementById("productName").value);
    formData.append(
      "description",
      document.getElementById("productDescription").value
    );
    formData.append("price", document.getElementById("productPrice").value);
    formData.append(
      "category",
      document.getElementById("productCategory").value
    );
    const files = document.getElementById("productImage").files;
    for (let i = 0; i < files.length; i++) {
      formData.append("productImage", files[i]);
    }
    const token = localStorage.getItem("authToken");
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const result = await response.json();
    const productOutput = document.getElementById("productOutput");
    productOutput.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  });

document
  .getElementById("getAllProducts")
  .addEventListener("click", async () => {
    const response = await fetch("/api/products");
    const result = await response.json();
    const productList = document.getElementById("productsList");
    productList.innerHTML = "";
    result.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.textContent = `${product.name} - ${product.price}`;
      productList.appendChild(productItem);
    });
  });
