// java.js

// Function to send a message and receive a response from ChatGPT


// Function to handle user input and send messages on Enter key press
async function handleInput(event) {
  var key = event.which || event.keyCode;
  if (key === 13) {
    const messageInput = this.value.trim();
    if (messageInput !== "") {
      sendMessage(messageInput, true);
      this.value = "";

      // Get the response from ChatGPT
      const response = await sendMessageToChatGPT(messageInput);

      // Display the response from ChatGPT
      sendMessage(response, false);
    }
  }
}

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

// ... Other functions and event listeners (handleSendButtonClick, etc.) remain the same ...
function handleSendButtonClick() {
  var messageInput = document.getElementById("message-input");
  if (messageInput.value.trim() !== "") {
    sendMessage(messageInput.value, true);
    messageInput.value = "";
  }
}

async function sendMessageToChatGPT(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer Apikey', // Replace 'YOUR_API_KEY' with your actual API key
    },
    body: JSON.stringify({
      'prompt': message,
      'max_tokens': 100,
      'model': 'gpt-3.5-turbo',
    }),
  });

  const data = await response.json();
  console.log(data);
  if (data && data.choices && data.choices.length > 0 && data.choices[0].text) {
    return data.choices[0].text.trim();
  } else {
    // Handle the case where the response does not have the expected structure
    console.error('Unexpected response format:', data);
    return 'Oops! Something went wrong. Please try again.';
  }
}
// Modify the existing event listener to use sendMessageToChatGPT function for user input
var message = document.getElementById("message-input");
message.addEventListener("keypress", handleInput);

var sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", handleSendButtonClick);

sendMessage("This is ChatGpt", false);
sendMessage("How Can I Help You Today?", false);