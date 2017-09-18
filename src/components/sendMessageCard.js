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
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  }
  return (
    <div className='card'>
      <header className='card-header' style={headerStyle}>
        <form name='messageForm' onSubmit={submitMessage}>
          <div className='field has-addons'>
            <p className='control'>
              <a className='button is-static'>
                <i className='fa fa-commenting-o' />
              </a>
            </p>
            <p className='control'>
              <input className='input' type='text' name='currentMessage' placeholder='Message' onChange={onChange} value={currentMessage} />
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
            ? <Menu
              leaveRoom={leaveRoom}
              removeRoom={removeRoom}
              inviteUser={inviteUser}
              roomCreator={roomCreator}
              username={username}
              roomId={roomId}
            />
            : null
            }
    </div>
  )
}

export default SendMessageCard
