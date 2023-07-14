const header = document.querySelector('.header-container').querySelector('h1');
const chatMembersCount = document.createElement('p');

fetch('https://77.246.96.226:3001/sendUsersCount')
    .then(request => request.json())
    .then(data => {
        chatMembersCount.textContent = `Нас уже ${data.result}, стань ${data.result + 1}!`;
        chatMembersCount.style = 'margin-top: 5px'
        header.appendChild(chatMembersCount);
    })

