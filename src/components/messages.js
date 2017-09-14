import React from 'react'

function Messages ({ messages, currentRoom, removeMessage, username }) {
  return (
    <div>
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
                    <strong>{message.username}</strong>
                    <small>
                      { message.date.split(',')[0] === new Date().toLocaleString().split(',')[0]
                         ? message.date.split(',')[1]
                         : message.date.split(',')[0]
                      }
                    </small>
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
  )
}

export default Messages
