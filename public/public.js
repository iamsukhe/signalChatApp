const socket = io();

let name;

let textArea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  name = prompt("Please Enter Your Name");
} while (!name);

textArea.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    sendMessage(e.target.value);
    textArea.value = "";
  }
});

function sendMessage(msg) {
  let msgObj = {
    user: name,
    message: msg.trim(),
  };
  // Append
  appendMessage(msgObj, "outgoing");

  //   send to server

  socket.emit("message", msgObj);
  scrollToBottom();
}

function appendMessage(msgObj, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markUp = `
  <h4>${msgObj.user}</h4>
  <p>${msgObj.message}</p>
  `;

  mainDiv.innerHTML = markUp;

  messageArea.appendChild(mainDiv);
  scrollToBottom();
}

// Recieve  message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
