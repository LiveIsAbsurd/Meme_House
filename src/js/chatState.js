const table = document.querySelector(".message-state");
const count = document.querySelector(".message-state-count");

fetch("https://v2009105.hosted-by-vdsina.ru:3001/sendChatState")
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
            
            num.textContent = index + 1;
            userLink.textContent = el.userName ? el.userName : el.userFirstName;
            if (el.userName) {
                userLink.href = `https://${el.userName}.t.me`;
            }
            count.textContent = el.count;

            user.appendChild(userLink);
            tr.appendChild(num);
            tr.appendChild(user);
            tr.appendChild(count);

            stateTable.appendChild(tr);
        })

        table.appendChild(stateTable);
    });