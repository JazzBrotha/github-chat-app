import { get } from './helpers'

const toggleActiveRoomLinkColors = room => {
  const roomLinkItems = Array.from(get('.room-link-item'))
  roomLinkItems.forEach(item =>
    (item.innerText === room)
    ? item.classList.add('is-active')
    : item.classList.remove('is-active')
  )
}

// const displayRoomInput = () => {
//   if (get('#create-room-container').childNodes.length === 1) {
//     const input = document.createElement('input')
//     input.setAttribute('type', 'text')
//     input.setAttribute('class', 'input')
//     input.setAttribute('placeholder', 'Type room name and press enter')
//     get('#create-room-container').appendChild(input)
//     return input
//   }
// }

// const removeRoomInput = input => {
//   get('#create-room-container').removeChild(input)
// }

const getRoomInput = () => {
  const roomName = get('#room-name').value.trim()
  return roomName
}

const addUserLeftMessage = user => {
  get('#message-container').innerHTML = `<span>${user} left channel</span>`
}

const removeClass = (element, className) => {
  get(element).classList.remove(className)
}

const addClass = (element, className) => {
  get(element).classList.add(className)
}

const toggleClass = (element, className) => {
  if (!get(element).classList.contains(className)) {
    get(element).classList.add(className)
  } else {
    get(element).classList.remove(className)
  }
}

const changeInnerHtml = (element, operator, html) => {
  if (operator === '=') {
    get(element).innerHTML = html
  } else {
    get(element).innerHTML += html
  }
}

export {
  toggleActiveRoomLinkColors,
  addUserLeftMessage,
  removeClass,
  addClass,
  changeInnerHtml,
  getRoomInput,
  toggleClass
}
