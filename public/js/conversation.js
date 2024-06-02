document
  .getElementById("createConversationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      participants: document
        .getElementById("conversationParticipants")
        .value.split(",")
        .map((id) => id.trim()),
    };
    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const conversationOutput = document.getElementById("conversationOutput");
    conversationOutput.innerHTML = `<pre>${JSON.stringify(
      result,
      null,
      2
    )}</pre>`;
  });

document
  .getElementById("getConversations")
  .addEventListener("click", async () => {
    const response = await fetch("/api/conversations");
    const result = await response.json();
    const conversationList = document.getElementById("conversationsList");
    conversationList.innerHTML = "";
    result.forEach((conversation) => {
      const conversationItem = document.createElement("div");
      conversationItem.textContent = `Conversation ID: ${conversation._id}`;
      conversationList.appendChild(conversationItem);
    });
  });

// HTML
// Add this inside the createConversationForm
// <div id="conversationOutput"></div>
