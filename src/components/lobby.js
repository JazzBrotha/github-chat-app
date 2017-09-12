import React from 'react'
import { closeModal } from '../utils/handlers.js'
function Lobby ({
  onSubmit,
  onChange,
  username,
  currentMessage,
  currentRoom,
  messages,
  removeMessage,
  inviteUser,
  submitInviteUser,
  roomCreator,
  roomId,
  removeRoom
}) {
  return (
    <div>
      <div id='invite-user-modal' className='modal'>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Invite users to "{currentRoom}"</p>
            <button onClick={() => closeModal('invite-user-modal')} className='delete' aria-label='close' />
          </header>
          <section id='invite-user-modal-body' className='modal-card-body'>
            <div className='field'>
              <p className='control has-icons-left'>
                <span className='select'>
                  <select id='users-select' />
                </span>
                <span className='icon is-small is-left'>
                  <i className='fa fa-user' />
                </span>
              </p>
            </div>
            <p id='error-container' />
          </section>
          <footer className='modal-card-foot'>
            <button onClick={submitInviteUser} id='submit-invite-user' className='button is-success'>Invite</button>
            <button onClick={() => closeModal('invite-user-modal')} className='button'>Cancel</button>
          </footer>
        </div>
      </div>
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
              : <a className='navbar-item'>
                <span className='bd-emoji mr-5'>
                  <i className='fa fa-sign-out' aria-hidden='true' />
                </span>
              Leave Room
            </a>
            }
          </nav>
        </header>
        : <header />
        }
        <div className='card-content'>
          <div className='content'>
            { messages.map(message => {
              if (message.room === currentRoom) {
                return (
                  <article key={message.id} className='media'>
                    <figure className='media-left' style={{ margin: 0 }}>
                      <p className='image is-64x64'>
                        <img src={message.profile_pic} />
                      </p>
                    </figure>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>{message.username}</strong> <small>{message.date}</small>
                          <br />
                          {message.body}
                        </p>
                      </div>
                    </div>
                    { message.username === username
                    ? <div className='media-right'>
                      <button onClick={() => removeMessage(message.id)} className='delete' />
                    </div>
                    : <div />
                  }
                  </article>
                )
              }
            })
          }
          </div>
        </div>
        <div className='card-footer' />
      </div>
      <div className='card testing p-10'>
        <header className='card-header'>
          <form name='messageForm' onSubmit={onSubmit}>
          <div className="field has-addons">
  <p className="control">
  <a className="button is-static">
  <i className="fa fa-commenting-o"></i>
          </a>
  </p>
  <p className="control">
  <input className='input' type='text' name='currentMessage' placeholder='Message' onChange={onChange} value={currentMessage} />
  </p>
  <p className="control">
    <button className="button" type='submit'>
    Send
    </button>
  </p>
</div>
          </form>
        </header>
        <div className='card-content' />
        <div className='card-footer' />
      </div>
    </div>
  )
}

export default Lobby
