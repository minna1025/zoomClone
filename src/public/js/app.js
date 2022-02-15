const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, (msg) => {
    console.log("서버가 말하더라 : ", msg);
  }); // send / callback함수는 무건 맨뒤에!
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
