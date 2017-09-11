import React from 'react'
function Lobby ({ onSubmit, onChange, username, currentMessage, currentRoom, messages, removeMessage }) {
  return (
    <div>
      <div className='card test p-10'>
        <header className='card-header'>
          <p className='card-header-title'>{currentRoom}</p>
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
