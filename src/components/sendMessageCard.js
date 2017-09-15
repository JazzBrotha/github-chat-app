import React from 'react'
import Menu from './menu'

function SendMessageCard ({
  submitMessage,
  onChange,
  currentMessage,
  currentRoom,
  checkRoomInput,
  username,
  inviteUser,
  roomCreator,
  leaveRoom,
  removeRoom,
  roomId
}) {
  const padding = {
    padding: '10px'
  }
  const formWidth = {
    width: '520px'
  }
  return (
    <div className='card'>
      <header className='card-header' style={padding}>
              <form name='messageForm' onSubmit={submitMessage}>
              <div className='field has-addons'>
            <p className='control'>
              <a className='button is-static'>
                <i className='fa fa-commenting-o' />
              </a>
            </p>
            <p className='control'>
              <input style={formWidth} className='input' type='text' name='currentMessage' placeholder='Message' onChange={onChange} value={currentMessage} />
            </p>
            <p className='control'>
              <button className='button bd-tw-button' type='submit'>
          Send
        </button>
            </p>
          </div>
            </form>
      </header>
      { currentRoom !== 'Lobby'
            ? <Menu />
            : null
            }
    </div>
  )
}

export default SendMessageCard
