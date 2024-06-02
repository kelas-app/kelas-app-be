document
  .getElementById("sendMessageForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      conversationId: document.getElementById("conversationId").value,
      sender: document.getElementById("messageSender").value,
      content: document.getElementById("messageContent").value,
    };
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const messageOutput = document.getElementById("messageOutput");
    messageOutput.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  });

// HTML
// Add this inside the sendMessageForm
// <div id="messageOutput"></div>
