// Function to send a message
function sendMessage(message, itsMe) {
  // Get the message container element
  var messageList = document.getElementById("messages");

  // Check if the container is scrolled to the bottom
  var scrollToBottom = (messageList.scrollHeight - messageList.scrollTop - messageList.clientHeight < 80);

  // Get the last message element
  var lastMessage = messageList.children[messageList.children.length - 1];

  // Create a new message element
  var newMessage = document.createElement("span");
  newMessage.innerHTML = message;

  // Determine the class name based on the sender
  var className;
  if (itsMe) {
    className = "me";
    // If the message is from me, always scroll to the bottom
    scrollToBottom = true;
  } else {
    className = "not-me";
  }

  // Check if the last message has the same class as the current one
  if (lastMessage && lastMessage.classList.contains(className)) {
    // If yes, append the new message to the existing message block
    lastMessage.appendChild(document.createElement("br"));
    lastMessage.appendChild(newMessage);
  } else {
    // If no, create a new message block and append the new message to it
    var messageBlock = document.createElement("div");
    messageBlock.classList.add(className);
    messageBlock.appendChild(newMessage);
    messageList.appendChild(messageBlock);
  }

  // Scroll to the bottom if needed
  if (scrollToBottom) {
    messageList.scrollTop = messageList.scrollHeight;
  }
}

// Function to handle user input and send messages on Enter key press
function handleInput(event) {
  var key = event.which || event.keyCode;
  if (key === 13 && this.value.trim() !== "") {
    sendMessage(this.value, true);
    this.value = "";
  }
}

// Function to handle sending messages when the button is clicked
function handleSendButtonClick() {
  var messageInput = document.getElementById("message-input");
  if (messageInput.value.trim() !== "") {
    sendMessage(messageInput.value, true);
    messageInput.value = "";
  }
}

// Add event listener to the message input field
var message = document.getElementById("message-input");
message.addEventListener("keypress", handleInput);

// Add event listener to the send button
var sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", handleSendButtonClick);

// Send initial messages
sendMessage("This is ChatGpt", false);
sendMessage("How Can I Help You Today?", false);
