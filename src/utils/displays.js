// displayRoomInput = () => {
//   const input = document.createElement('input')
//   input.setAttribute('type', 'text')
//   input.setAttribute('placeholder', 'Type room name and press enter')
//   const createRoomContainer = document.getElementById('create-room-container')
//   createRoomContainer.appendChild(input)
//   input.addEventListener('keyup', (e) => {
//     if (input.value.length > 0) {
//         if (e.which === 13) {
//           this.createRoom(input.value)
//           createRoomContainer.removeChild(input)
//         }
//       }
//   })
// }

const toggleActiveRoomLinkColors = (room) => {
  const roomLinkItems = Array.from(document.getElementsByClassName('room-link-item'))
  roomLinkItems.forEach(item => {
    if (item.innerText === room) {
      item.style.backgroundColor = 'whitesmoke'
      item.style.color = '#363636'
    } else {
      item.style.backgroundColor = 'transparent'
      item.style.color = '#4a4a4a'
    }
  })
}

export {toggleActiveRoomLinkColors}
