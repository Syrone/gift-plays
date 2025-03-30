/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/theme.js */ "./src/js/components/theme.js");
/* harmony import */ var _components_gift_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/gift.js */ "./src/js/components/gift.js");



/***/ }),

/***/ "./src/js/components/gift.js":
/*!***********************************!*\
  !*** ./src/js/components/gift.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
document.querySelectorAll('.gift')?.forEach(container => {
  const spin = container.querySelector('.gift-spin');
  const spinContainer = container.querySelector('.gift-spin-container');
  const spinTabs = container.querySelector('.gift-tabs');
  const buttonPlay = container.querySelector('.gift-play');
  const buttonPlayCost = buttonPlay.querySelector('.gift-play-cost');
  const calculateOffset = () => {
    const cardWidth = spinContainer.firstElementChild.offsetWidth;
    const spinWidth = spin.offsetWidth;
    return {
      cardWidth,
      spinWidth,
      offset: (spinWidth - cardWidth + 12) / 2
    };
  };
  const createCardElement = cardData => {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'gift-spin-item';
    const limitedHtml = cardData.limited ? `
      <div class="card-status">
        <img loading="lazy" src="./img/cards/card-decoration.svg" class="card-status-decoration" width="50" height="50" alt="Decoration">
        <span class="card-status-value">Limited</span>
      </div>
    ` : '';
    cardWrapper.innerHTML = `
      <article class="card">
        <div class="card-overflow">
          ${limitedHtml}
        </div>
        <div class="card-picture">
          <img loading="lazy" src="./img/cards/${cardData.image}.svg" class="card-image" width="80" height="80" alt="Gift">
        </div>
        <div class="card-price">
          <div class="card-price-value">
            <img loading="lazy" src="./img/star.svg" class="icon-image" width="18" height="18" alt="Star">
            ${cardData.cost}
          </div>
        </div>
      </article>
    `;
    return cardWrapper;
  };
  Object.keys(window.costSpin).forEach((key, index) => {
    const costData = window.costSpin[key];
    const li = document.createElement('li');
    li.className = 'gift-tab';
    li.innerHTML = `
      <button type="button" class="btn btn-md btn-transparent gift-spin-cost ${index === 0 ? ' is-active' : ''}">
        <img loading="lazy" src="./img/star.svg" class="icon-image" width="18" height="18" alt="Star">
        ${costData.cost}
      </button>
    `;
    spinTabs.appendChild(li);
  });
  Object.keys(window.cardsObject).forEach(key => {
    spinContainer.appendChild(createCardElement(window.cardsObject[key]));
  });
  const spinReel = function () {
    let winningCardKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (winningCardKey === null) return;
    const totalCards = 60;
    const winningIndex = 50;
    const reel = [];
    for (let i = 0; i < totalCards; i++) {
      let card = i === winningIndex ? window.cardsObject[winningCardKey] : window.cardsObject[Object.keys(window.cardsObject)[Math.floor(Math.random() * Object.keys(window.cardsObject).length)]];
      reel.push(card);
    }
    spinContainer.innerHTML = '';
    reel.forEach(cardData => spinContainer.appendChild(createCardElement(cardData)));
    const {
      cardWidth,
      offset
    } = calculateOffset();
    const targetTranslateX = -winningIndex * cardWidth + offset;
    buttonPlay.disabled = true;
    spinContainer.style.transition = 'transform 3s ease-out';
    spinContainer.style.transform = `translateX(${targetTranslateX}px)`;
    spinContainer.addEventListener('transitionend', function handler() {
      spinContainer.style.transition = 'none';
      for (let i = 0; i < 40; i++) {
        if (spinContainer.firstElementChild) {
          spinContainer.removeChild(spinContainer.firstElementChild);
        }
      }
      const newTranslateX = -((winningIndex - 40) * cardWidth) + offset;
      spinContainer.style.transform = `translateX(${newTranslateX}px)`;
      spinContainer.removeEventListener('transitionend', handler);
      buttonPlay.disabled = false;
    });
  };
  const {
    cardWidth,
    offset
  } = calculateOffset();
  const centerIndex = Math.floor(spinContainer.children.length / 2);
  spinContainer.style.transform = `translateX(${-centerIndex * cardWidth + offset}px)`;
  buttonPlayCost.innerHTML = window.costSpin[0].cost;
  spinTabs.addEventListener('click', event => {
    const buttonTabCost = event.target.closest('.gift-spin-cost');
    if (buttonTabCost) {
      spinTabs.querySelectorAll('.gift-spin-cost').forEach(btn => btn.classList.remove('is-active'));
      buttonTabCost.classList.add('is-active');
      buttonPlayCost.innerHTML = buttonTabCost.textContent.trim();
    }
  });
  buttonPlay.addEventListener('click', () => spinReel(4));
});

/***/ }),

/***/ "./src/js/components/theme.js":
/*!************************************!*\
  !*** ./src/js/components/theme.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const scheme = window.Telegram.WebApp.colorScheme;
scheme === "dark" ? document.documentElement.classList.add("dark-theme") : document.documentElement.classList.remove("dark-theme");

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");

})();

/******/ })()
;