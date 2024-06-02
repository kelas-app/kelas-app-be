document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      firstname: document.getElementById("regFirstName").value,
      lastname: document.getElementById("regLastName").value,
      username: document.getElementById("regUsername").value,
      email: document.getElementById("regEmail").value,
      phone: document.getElementById("regPhone").value,
      password: document.getElementById("regPassword").value,
      address: document.getElementById("regAddress").value,
    };
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const registerOutput = document.getElementById("registerOutput");
    registerOutput.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result.token) {
    localStorage.setItem("authToken", result.token);
  }
  const loginOutput = document.getElementById("loginOutput");
  loginOutput.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
});
