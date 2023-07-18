const adminList = document.querySelector('.admin-list');
const popup = document.querySelector('.popup');
const popupAdminPhoto = popup.querySelector('.popup__admin-photo');
const popupAdminName = popup.querySelector('.popup__admin-name');
const popupAdminCastomName = popup.querySelector('.popup__admin-castomName');
const adminDescription = popup.querySelector('.popup__admin-description');
const popupClose = popup.querySelector('.popup__close-button');

popupClose.addEventListener('click', () => {
    popup.classList.add('popup--hidden');
    popupAdminPhoto.classList.remove('admin-list__vip-user');
});

fetch('https://v2009105.hosted-by-vdsina.ru:3001/sendAdminList')
    .then(request => request.json())
    .then(admins => {
        admins.result.forEach(element => {
            fetch(`https://v2009105.hosted-by-vdsina.ru:3001/sendAdminInfo/${element.user.id}`)
                .then(response => response.json())
                .then(data => {
                    const photoInfo = data.result.photos[0][0];

                    fetch(`https://v2009105.hosted-by-vdsina.ru:3001/sendAdminPhotoInfo/${photoInfo.file_id}`)
                        .then(response => response.blob())
                        .then(img => {
                            const imgUrl = URL.createObjectURL(img);

                            const admin = document.createElement('li');
                            admin.classList.add('admin-list__element');

                            const adminPhoto = document.createElement('img');
                            adminPhoto.classList.add('admin-list__photo');
                            adminPhoto.src = imgUrl;

                            if (element.user.username == 'LiveIsAbsurd') {
                                adminPhoto.classList.add('admin-list__vip-user');
                            }

                            admin.appendChild(adminPhoto);

                            const adminName = document.createElement('p');
                            adminName.classList.add('admin-list__name');
                            if (element.user.username == 'meme_house_bot') {
                                adminName.textContent = 'Meme House';
                            } else {
                                adminName.textContent = element.user.first_name;
                            }
                            
                            
                            const adminCastomName = document.createElement('p');
                            adminCastomName.classList.add('admin-list__admin-castom-name');
                            adminCastomName.textContent = element.custom_title;

                            

                            admin.appendChild(adminName);
                            admin.appendChild(adminCastomName);
                            

                            adminList.appendChild(admin);

                            admin.addEventListener('click', () => {
                                setAdminPopup(imgUrl, element.user.first_name, element.custom_title, element.user.id, element.user.username);
                            });
                        })
                    })
                })
        })

function setAdminPopup (img, name, castomName, userId, userName) {
    let windowHeight = window.innerHeight;
    let popupHeight = popup.offsetHeight;
    let scrollY = window.scrollY;

    let topOffset = (windowHeight - popupHeight) / 2 + scrollY;
    popup.style.top = topOffset + 'px';

    popupAdminPhoto.src = img;
    popupAdminName.textContent = name;
    popupAdminName.href = `https://${userName}.t.me`;
    popupAdminCastomName.textContent = castomName;

    if (userName == 'LiveIsAbsurd') {
        popupAdminPhoto.classList.add('admin-list__vip-user');
    }

    fetch(`https://v2009105.hosted-by-vdsina.ru:3001/sendAdminDescription/${userId}`)
        .then(response => response.json())
        .then(description => {
            adminDescription.textContent = description;
            popup.classList.remove('popup--hidden');
        })
        .catch(err => console.log(err))
}