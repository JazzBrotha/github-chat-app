import { get } from './helpers'

const getRoomInput = () => {
  const roomName = get('#room-name').value.trim()
  return roomName
}

// const addUserLeftMessage = user => {
//   get('#message-container').innerHTML = `<span>${user} left channel</span>`
// }

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
  removeClass,
  addClass,
  changeInnerHtml,
  getRoomInput,
  toggleClass
}
