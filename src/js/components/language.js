import i18next from 'i18next'
import i18nextHttpBackend from 'i18next-http-backend'

const userLanguage = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code || 'en'

function updateContent() {
  document.querySelectorAll('[data-i18next]')?.forEach(translateElement)
}

function translateElement(element) {
  const key = element.getAttribute('data-i18next')
  if (element.tagName.toLowerCase() === 'input') {
    element.placeholder = i18next.t(key)
  } else {
    element.innerHTML = i18next.t(key)
  }
}

function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.hasAttribute('data-i18next')) {
              translateElement(node)
            }
            node.querySelectorAll('[data-i18next]').forEach(translateElement)
          }
        })
      } else if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'data-i18next') {
          translateElement(mutation.target)
        }
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-i18next']
  })
}

i18next
  .use(i18nextHttpBackend)
  .init({
    lng: userLanguage,
    backend: {
      loadPath: './locales/{{lng}}.json'
    }
  }, function (err, t) {
    updateContent()
    observeDOMChanges()
  })
