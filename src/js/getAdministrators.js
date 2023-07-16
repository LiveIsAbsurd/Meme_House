const adminList = document.querySelector('.admin-list');

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
                            admin.appendChild(adminCastomName)
                            

                            adminList.appendChild(admin);
                        })
                    })
                })
        })