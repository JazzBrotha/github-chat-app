import React from 'react'

function Messages ({ messages, currentRoom, removeMessage, username }) {
  const ownMessage = {
    backgroundColor: 'green',
    color: 'white'
  }
  const noMargin = {
    margin: 0
  }
  return (
    <div>
      { messages.map((message, index) => {
        if (message.room === currentRoom) {
          return (
            <article key={message.id} className='media'>
              { index > 0
              ? messages[index].username !== messages[index - 1].username
                ? <figure className='media-left' style={noMargin}>
                  <p className='image is-64x64'>
                    <img src={message.profile_pic} />
                  </p>
                </figure>
                : null
                : <figure className='media-left' style={noMargin}>
                  <p className='image is-64x64'>
                    <img src={message.profile_pic} />
                  </p>
                </figure>
                }
              <div className='media-content'style={username === message.username ? ownMessage : null} >
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
                  : null
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
