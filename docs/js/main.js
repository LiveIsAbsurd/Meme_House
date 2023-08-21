/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/button-more.js":
/*!***************************!*\
  !*** ./js/button-more.js ***!
  \***************************/
/***/ (() => {

const buttonMoreDescription = document.querySelector(".button-description");
const mainDescription = document.querySelector(".main-container__description");
buttonMoreDescription.addEventListener("click", e => {
  mainDescription.classList.toggle("main-container__description--hidden");

  if (buttonMoreDescription.textContent == "СКРЫТЬ") {
    buttonMoreDescription.textContent = "А ПОДРОБНЕЕ?";
  } else {
    buttonMoreDescription.textContent = "СКРЫТЬ";
  }
});

/***/ }),

/***/ "./js/chatState.js":
/*!*************************!*\
  !*** ./js/chatState.js ***!
  \*************************/
/***/ (() => {

const table = document.querySelector(".message-state");
const count = document.querySelector(".message-state-count");
fetch("https://v2009105.hosted-by-vdsina.ru:3001/sendChatState").then(request => request.json()).then(data => {
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
      userLink.href = `${el.userName}.t.me`;
    }

    count.textContent = el.count;
    user.appendChild(userLink);
    tr.appendChild(num);
    tr.appendChild(user);
    tr.appendChild(count);
    stateTable.appendChild(tr);
  });
  table.appendChild(stateTable);
});

/***/ }),

/***/ "./js/getAdministrators.js":
/*!*********************************!*\
  !*** ./js/getAdministrators.js ***!
  \*********************************/
/***/ (() => {

const adminList = document.querySelector(".admin-list");
const popup = document.querySelector(".popup");
const popupAdminPhoto = popup.querySelector(".popup__admin-photo");
const popupAdminName = popup.querySelector(".popup__admin-name");
const popupAdminCastomName = popup.querySelector(".popup__admin-castomName");
const adminDescription = popup.querySelector(".popup__admin-description");
const popupClose = popup.querySelector(".popup__close-button");
popupClose.addEventListener("click", () => {
  popup.classList.add("popup--hidden");
  popupAdminPhoto.classList.remove("admin-list__vip-user");
  popupAdminPhoto.classList.remove("admin-list__slaziet");
});
fetch("https://v2009105.hosted-by-vdsina.ru:3001/sendAdminList").then(request => request.json()).then(admins => {
  admins.result.forEach(element => {
    fetch(`https://v2009105.hosted-by-vdsina.ru:3001/sendAdminInfo/${element.user.id}`).then(response => response.json()).then(data => {
      const photoInfo = data.result.photos[0][0];
      fetch(`https://v2009105.hosted-by-vdsina.ru:3001/sendAdminPhotoInfo/${photoInfo.file_id}`).then(response => response.blob()).then(img => {
        const imgUrl = URL.createObjectURL(img);
        const admin = document.createElement("li");
        admin.classList.add("admin-list__element");
        const adminPhoto = document.createElement("img");
        adminPhoto.classList.add("admin-list__photo");
        adminPhoto.src = imgUrl;

        if (element.user.id == "261749882") {
          adminPhoto.classList.add("admin-list__vip-user");
        }

        if (element.user.id == "300711096") {
          adminPhoto.classList.add("admin-list__slaziet");
        }

        admin.appendChild(adminPhoto);
        const adminName = document.createElement("p");
        adminName.classList.add("admin-list__name");

        if (element.user.username == "meme_house_bot") {
          adminName.textContent = "Meme House";
        } else {
          adminName.textContent = element.user.first_name;
        }

        const adminCastomName = document.createElement("p");
        adminCastomName.classList.add("admin-list__admin-castom-name");
        adminCastomName.textContent = element.custom_title;
        admin.appendChild(adminName);
        admin.appendChild(adminCastomName);
        adminList.appendChild(admin);
        admin.addEventListener("click", () => {
          setAdminPopup(imgUrl, element.user.first_name, element.custom_title, element.user.id, element.user.username);
        });
      });
    });
  });
});

function setAdminPopup(img, name, castomName, userId, userName) {
  let windowHeight = window.innerHeight;
  let popupHeight = popup.offsetHeight;
  let scrollY = window.scrollY;
  let topOffset = (windowHeight - popupHeight) / 2 + scrollY;
  popup.style.top = topOffset + "px";
  popupAdminPhoto.src = img;
  popupAdminName.textContent = name;
  popupAdminName.href = `https://${userName}.t.me`;
  popupAdminCastomName.textContent = castomName;

  if (userId == "261749882") {
    popupAdminPhoto.classList.add("admin-list__vip-user");
  }

  if (userId == "300711096") {
    popupAdminPhoto.classList.add("admin-list__slaziet");
  }

  fetch(`https://v2009105.hosted-by-vdsina.ru:3001/sendAdminDescription/${userId}`).then(response => response.json()).then(description => {
    adminDescription.textContent = description;
    popup.classList.remove("popup--hidden");
  }).catch(err => console.log(err));
}

/***/ }),

/***/ "./js/getUsers.js":
/*!************************!*\
  !*** ./js/getUsers.js ***!
  \************************/
/***/ (() => {

const header = document.querySelector(".header-container").querySelector("h1");
const chatMembersCount = document.createElement("p");
fetch("https://v2009105.hosted-by-vdsina.ru:3001/sendUsersCount").then(request => request.json()).then(data => {
  chatMembersCount.textContent = `Нас уже ${data.result}, стань ${data.result + 1}!`;
  chatMembersCount.style = "margin-top: 5px";
  header.appendChild(chatMembersCount);
}).catch(() => alert("Сервер упал :("));

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.sass */ "./sass/main.sass");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.html */ "./index.html");
/* harmony import */ var _swiperInit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./swiperInit */ "./js/swiperInit.js");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! normalize.css */ "../node_modules/normalize.css/normalize.css");
/* harmony import */ var _button_more__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./button-more */ "./js/button-more.js");
/* harmony import */ var _button_more__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_button_more__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _getUsers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getUsers */ "./js/getUsers.js");
/* harmony import */ var _getUsers__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_getUsers__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _getAdministrators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getAdministrators */ "./js/getAdministrators.js");
/* harmony import */ var _getAdministrators__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_getAdministrators__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chatState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chatState */ "./js/chatState.js");
/* harmony import */ var _chatState__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chatState__WEBPACK_IMPORTED_MODULE_7__);









/***/ }),

/***/ "./js/swiperInit.js":
/*!**************************!*\
  !*** ./js/swiperInit.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/swiper.esm.js");
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/css */ "../node_modules/swiper/swiper.min.css");
/* harmony import */ var swiper_css_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/css/pagination */ "../node_modules/swiper/modules/pagination/pagination.min.css");




if (window.innerWidth < 500) {
  const swiper = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"](".swiper", {
    modules: [swiper__WEBPACK_IMPORTED_MODULE_0__.Pagination],
    slidesPerView: 2,
    spaceBetween: 190,
    pagination: {
      el: ".swiper-pagination"
    }
  });
}

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "../node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./img/1688975928719.gif */ "./img/1688975928719.gif"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/telegram-svgrepo-com.svg */ "./assets/telegram-svgrepo-com.svg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var code = "<!DOCTYPE html>\r\n<html lang=\"ru\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Meme house (сайт)</title>\r\n</head>\r\n<body class=\"body\">\r\n    <div class=\"header-container\">\r\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"\" class=\"header-container__image\">\r\n        <h1>Meme_House (дом) <br> Чат для постинга мемов и общения с собственной NFT коллекцией и конкурсами.</h1>\r\n    </div>\r\n    <a href=\"https://t.me/meme_house_chat\"><img src='" + ___HTML_LOADER_REPLACEMENT_1___ + "' class=\"link-logo\"></img></a>\r\n\r\n    <div class=\"main-container\">\r\n        <div class=\"main-container__description main-container__description--hidden\">\r\n            <p>Чат созданный для общения, обмена важными новостями, мемами, музыкой и всем чем угодно. Постоянный контроль чата администраторами позволяет исключить рекламных ботов в чате и остальных негативных факторов, которыми кишат чаты. Филосовская элита чата всегда поддержит твои мысли о бессмысленности жизни, а ценитили музыки по полочкам разложат твой музыкальный вкус.</p>\r\n            <h2>В чате присутсвуют строго расписанные правила и обязанности каждого участника</h2>\r\n        </div>\r\n        \r\n        <button class=\"more-button button-description\">А ПОДРОБНЕЕ?</button>\r\n        <h2 class=\"main-container__header\">Главные админы</h2>\r\n        <ul class=\"admin-list\">\r\n            \r\n        </ul>\r\n\r\n        <h2 class=\"main-container__header\">Статистика чата</h2>\r\n        <p class=\"main-container__description\">Всего сообщений с 27.07.2023: <span class=\"message-state-count\">Нет данных</span></p>\r\n        <div class=\"state-wrapper state-wrapper__hidden\">\r\n            <table class=\"message-state\">\r\n                <tr>\r\n                    <th>№</th>\r\n                    <th>Имя</th>\r\n                    <th>Сообщений</th>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"popup popup--hidden\">\r\n        <button class=\"popup__close-button\"></button>\r\n        <div class=\"popup__admin-info\">\r\n            <img  class=\"popup__admin-photo\"></img>\r\n            <div class=\"popup__admin-names\">\r\n                <a href = '#' class=\"popup__admin-name\">Тестds gdsgdsg</a>\r\n                <p class=\"popup__admin-castomName\">Тестdsgd sgdsgds</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup__wrapper\">\r\n            <h2 class=\"popup__admin-desc-header\">Немного об админе</h2>\r\n            <p class=\"popup__admin-description\"></p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./sass/main.sass":
/*!************************!*\
  !*** ./sass/main.sass ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/telegram-svgrepo-com.svg":
/*!*****************************************!*\
  !*** ./assets/telegram-svgrepo-com.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/telegram-svgrepo-com.svg";

/***/ }),

/***/ "./img/1688975928719.gif":
/*!*******************************!*\
  !*** ./img/1688975928719.gif ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "img/1688975928719.gif";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_html-loader_dist_runtime_getUrl_js-node_modules_normalize_css_normalize_-ebf99d"], () => (__webpack_require__("./js/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map