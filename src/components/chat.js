import React from 'react'
import InviteUserModal from './inviteUserModal'
import SendMessageCard from './sendMessageCard'
import Messages from './messages'
function Chat ({
  submitMessage,
  onChange,
  username,
  currentMessage,
  currentRoom,
  messages,
  removeMessage,
  inviteUser,
  roomCreator,
  roomId,
  removeRoom,
  leaveRoom,
  submitInviteUser
}) {
  return (
    <div>
      <InviteUserModal currentRoom={currentRoom} submitInviteUser={submitInviteUser} />
      <div className='card test p-10'>
        <header className='card-header bs-none'>
          <nav className='navbar' role='navigation' aria-label='navigation'>
            <div className='navbar-item'>
              <h3 className='title is-3'>{currentRoom}</h3>
            </div>
          </nav>
        </header>
        { currentRoom !== 'Lobby'
        ? <header className='card-header'>
          <nav className='navbar' role='navigation' aria-label='navigation'>
            <a onClick={inviteUser} className='navbar-item'>
              <span className='bd-emoji mr-5'>
                <i className='fa fa-user-plus' aria-hidden='true' />
              </span>
              Invite User
            </a>
            { roomCreator === username
              ? <a onClick={() => removeRoom(roomId)} className='navbar-item'>
                <span className='bd-emoji mr-5'>
                  <i className='fa fa-trash' aria-hidden='true' />
                </span>
                   Delete Room
                 </a>
              : <a onClick={() => leaveRoom(roomId)} className='navbar-item'>
                <span className='bd-emoji mr-5'>
                  <i className='fa fa-sign-out' aria-hidden='true' />
                </span>
              Leave Room
            </a>
            }
          </nav>
        </header>
        : null
        }
        <div className='card-content'>
          <div className='content'>
            <Messages
              messages={messages}
              removeMessage={removeMessage}
              username={username}
              currentRoom={currentRoom}
            />
            <p id='message-container' />
          </div>
        </div>
      </div>
      <SendMessageCard
        submitMessage={submitMessage}
        onChange={onChange}
        currentMessage={currentMessage}
        />
    </div>
  )
}

export default Chat
