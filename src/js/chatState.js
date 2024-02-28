const table = document.querySelector(".message-state");
const count = document.querySelector(".message-state-count");

fetch("https://v3789.hosted-by-vdsina.com:3001/sendChatState")
    .then(request => request.json())
    .then(data => {
        count.textContent = data.totalMessage;
        
        let state = Object.values(data.userMessage);
        let stateTable = document.createDocumentFragment();

        state.sort((a, b) => {
            return b.count - a.count;
        });
        
        state.forEach((el, index) => {
            let tr = document.createElement("tr");
            let num = document.createElement("td");
            let user = document.createElement("td");
            let count = document.createElement("td");
            let userLink = document.createElement("a");
            let stateNum = index + 1;
            
            if (stateNum == 1) {
                tr.classList.add("message-state__gold-user");
            } else if (stateNum == 2) {
                tr.classList.add("message-state__silver-user");
            } else if (stateNum == 3) {
                tr.classList.add("message-state__platinum-user");
            }
            
            num.textContent = stateNum;
            userLink.textContent = el.userName ? el.userName : el.userFirstName;
            if (el.userName) {
                userLink.href = `https://${el.userName}.t.me`;
                user.classList.add("message-state__user");
            }
            count.textContent = `${el.count}/${Math.floor(el.count/data.totalMessage * 100)}%`;

            user.appendChild(userLink);
            tr.appendChild(num);
            tr.appendChild(user);
            tr.appendChild(count);

            stateTable.appendChild(tr);
        })

        table.appendChild(stateTable);
    });