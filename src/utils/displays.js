import { get } from './helpers'

const toggleActiveRoomLinkColors = (room) => {
  const roomLinkItems = Array.from(get('.room-link-item'))
  roomLinkItems.forEach(item =>
    (item.innerText === room)
    ? item.classList.add('is-active')
    : item.classList.remove('is-active')
  )
}

const closeModal = (modalId) => {
  const modal = document.getElementById(modalId)
  modal.classList.remove('is-active')
}

const displayRoomInput = () => {
  if (get('#create-room-container').childNodes.length === 1) {
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('class', 'input')
    input.setAttribute('placeholder', 'Type room name and press enter')
    get('#create-room-container').appendChild(input)
    return input
  }
}

const removeRoomInput = input => {
  get('#create-room-container').removeChild(input)
}

const addUserLeftMessage = user => {
  get('#message-container').innerHTML = `<span>${user} left channel</span>`
}

export { toggleActiveRoomLinkColors, closeModal, displayRoomInput, removeRoomInput, addUserLeftMessage }
