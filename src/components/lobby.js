import React from 'react'
function Lobby ({
  onSubmit,
  onChange,
  username,
  currentMessage,
  currentRoom,
  messages,
  removeMessage,
  inviteUser,
  submitInviteUser
}) {
  return (
    <div>
      <div id='invite-user-modal' className='modal'>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Invite users to {currentRoom}</p>
            <button className='delete' aria-label='close' />
          </header>
          <section id='invite-user-modal-body' className='modal-card-body'>
            <div className='field'>
              <p className='control has-icons-left'>
                <span className='select'>
                  <select id='users-select'>
                    <option>User</option>
                  </select>
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
            <button className='button'>Cancel</button>
          </footer>
        </div>
      </div>
      <div className='card test p-10'>
        <header className='card-header'>
          <p className='card-header-title'>{currentRoom} <a onClick={inviteUser}><i className='fa fa-user-plus' aria-hidden='true' /></a></p>
        </header>
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
            <input type='text' name='currentMessage' placeholder='Message' onChange={onChange} value={currentMessage} />
            <button type='submit' className='button'>Send</button>
          </form>
        </header>
        <div className='card-content' />
        <div className='card-footer' />
      </div>
    </div>
  )
}

export default Lobby
