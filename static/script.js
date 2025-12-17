const socket = io("https://zuu-chat.onrender.com");
let myUsername = "";

// Send a message
function sendMessage() {
    const message = document.getElementById("messageInput");
    const username = document.getElementById("usernameInput");

    const user = username.value.trim();
    const msg = message.value.trim();

    if (msg === "" || user === "") return;

    // Store myUsername once
    myUsername = user;

    // Emit the message
    socket.emit("send_message", {
        username: user,
        message: msg
    });

    // Clear input box
    message.value = "";
}
// Listen for incoming messages from server
socket.on("receive_message", function(data) {
    const chatBox = document.getElementById("chat-box");

    // Create a message div
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message");

    // Check if the message is from me or another user
    if (data.username === myUsername) {
        msgDiv.classList.add("me");
        msgDiv.innerHTML = `<div class="username">You</div><div>${data.message}</div>`;
    } else {
        msgDiv.classList.add("other");
        msgDiv.innerHTML = `<div class="username">${data.username}</div><div>${data.message}</div>`;
    }

    // Add message to chat box
    chatBox.appendChild(msgDiv);

    // Scroll to the bottom automatically
    chatBox.scrollTop = chatBox.scrollHeight;

});

