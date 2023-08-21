const table = document.querySelector(".message-state");

fetch("https://v2009105.hosted-by-vdsina.ru:3001/sendChatState")
    .then(request => request.json())
    .then(data => {
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
            
            num.textContent = index + 1;
            user.textContent = el.userName ? el.userName : el.userFirstName;
            count.textContent = el.count;

            tr.appendChild(num);
            tr.appendChild(user);
            tr.appendChild(count);

            stateTable.appendChild(tr);
        })

        table.appendChild(stateTable);
        console.log(state)
    });