import React from 'react'
function Menu ({
  checkRoomInput,
  username,
  inviteUser,
  roomCreator,
  leaveRoom,
  removeRoom,
  roomId
}) {
  const footerButton = {
    backgroundColor: '#3273dc',
    color: '#fff'
  }
  return (
    <footer className='card-footer'>
      <a onClick={inviteUser} className='card-footer-item' style={footerButton}>
        <span className='bd-emoji mr-5'>
          <i className='fa fa-user-plus' />
        </span>
      Invite User
    </a>
      { roomCreator === username
      ? <a onClick={() => removeRoom(roomId)} className='card-footer-item footer-button' style={footerButton}>
        <span className='bd-emoji mr-5'>
          <i className='fa fa-trash' />
        </span>
          Delete Room
        </a>
      : <a onClick={() => leaveRoom(roomId)} className='card-footer-item' style={footerButton}>
        <span className='bd-emoji mr-5'>
          <i className='fa fa-sign-out' />
        </span>
          Leave Room
        </a>
    }
    </footer>
  )
}
export default Menu
