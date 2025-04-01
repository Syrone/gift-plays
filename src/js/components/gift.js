document.querySelectorAll('.gift')?.forEach((container) => {
  const spin = container.querySelector('.gift-spin')
  const spinContainer = container.querySelector('.gift-spin-container')
  const spinTabs = container.querySelector('.gift-tabs')
  const buttonPlay = container.querySelector('.gift-play')
  const buttonPlayCost = buttonPlay.querySelector('.gift-play-cost')

  const calculateOffset = () => {
    const cardWidth = spinContainer.firstElementChild.offsetWidth
    const spinWidth = spin.offsetWidth
    return {
      cardWidth,
      spinWidth,
      offset: (spinWidth - cardWidth + 12) / 2
    }
  }

  const createCardElement = (cardData) => {
    const cardWrapper = document.createElement('div')
    cardWrapper.className = 'gift-spin-item'

    const limitedHtml = cardData.limited ? `
      <div class="card-status">
        <img loading="lazy" src="./img/cards/card-decoration.svg" class="card-status-decoration" width="50" height="50" alt="Decoration">
        <span class="card-status-value" data-i18next="text_card_status"></span>
      </div>
    ` : ''

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
    `
    return cardWrapper
  }

  Object.keys(window.costSpin).forEach((key, index) => {
    const costData = window.costSpin[key]
    const li = document.createElement('li')
    li.className = 'gift-tab'
    li.innerHTML = `
      <button type="button" class="btn btn-md btn-transparent gift-spin-cost ${index === 0 ? ' is-active' : ''}">
        <img loading="lazy" src="./img/star.svg" class="icon-image" width="18" height="18" alt="Star">
        ${costData.cost}
      </button>
    `
    spinTabs.appendChild(li)
  })

  Object.keys(window.cardsObject).forEach((key) => {
    spinContainer.appendChild(createCardElement(window.cardsObject[key]))
  })

  const spinReel = (winningCardKey = null) => {
    if (winningCardKey === null) return

    const totalCards = 60
    const winningIndex = 50
    const reel = []

    for (let i = 0; i < totalCards; i++) {
      let card = i === winningIndex ? window.cardsObject[winningCardKey] : window.cardsObject[Object.keys(window.cardsObject)[Math.floor(Math.random() * Object.keys(window.cardsObject).length)]]
      reel.push(card)
    }

    spinContainer.innerHTML = ''
    reel.forEach(cardData => spinContainer.appendChild(createCardElement(cardData)))

    const { cardWidth, offset } = calculateOffset()
    const targetTranslateX = -winningIndex * cardWidth + offset

    buttonPlay.disabled = true
    spinContainer.style.transition = 'transform 3s ease-out'
    spinContainer.style.transform = `translateX(${targetTranslateX}px)`

    spinContainer.addEventListener('transitionend', function handler() {
      spinContainer.style.transition = 'none'
      for (let i = 0; i < 40; i++) {
        if (spinContainer.firstElementChild) {
          spinContainer.removeChild(spinContainer.firstElementChild)
        }
      }
      const newTranslateX = -((winningIndex - 40) * cardWidth) + offset
      spinContainer.style.transform = `translateX(${newTranslateX}px)`
      spinContainer.removeEventListener('transitionend', handler)
      buttonPlay.disabled = false
    })
  }

  const { cardWidth, offset } = calculateOffset()
  const centerIndex = Math.floor(spinContainer.children.length / 2)
  spinContainer.style.transform = `translateX(${-centerIndex * cardWidth + offset}px)`

  buttonPlayCost.innerHTML = window.costSpin[0].cost

  spinTabs.addEventListener('click', (event) => {
    const buttonTabCost = event.target.closest('.gift-spin-cost')
    if (buttonTabCost) {
      spinTabs.querySelectorAll('.gift-spin-cost').forEach((btn) => btn.classList.remove('is-active'))
      buttonTabCost.classList.add('is-active')
      buttonPlayCost.innerHTML = buttonTabCost.textContent.trim()
    }
  })

  buttonPlay.addEventListener('click', () => spinReel(12))
})
