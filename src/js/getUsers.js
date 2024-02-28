const header = document.querySelector(".header-container").querySelector("h1");
const chatMembersCount = document.createElement("p");

fetch("https://v3789.hosted-by-vdsina.com:3001/sendUsersCount")
  .then((request) => request.json())
  .then((data) => {
    chatMembersCount.textContent = `Нас уже ${data.result}, стань ${
      data.result + 1
    }!`;
    chatMembersCount.style = "margin-top: 5px";
    header.appendChild(chatMembersCount);
  })
  .catch(() => alert("Сервер упал :("))
