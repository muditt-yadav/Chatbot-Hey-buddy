async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (!userInput.trim()) return;

    // Add user message
    let userMessage = `<div class="user-message"><strong>You:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    // Fetch bot response
    let response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    });

    let data = await response.json();
    // Add bot message
    let botMessage = `<div class="bot-message"><strong>Bot:</strong> ${data.reply}</div>`;
    chatBox.innerHTML += botMessage;

    // Clear input and scroll to the bottom
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
}

