import React from 'react'

function Messages ({ message, key }) {
  const margin = {
    margin: '10px'
  }
  const otherMessage = {
    backgroundColor: '#00c4a7',
    padding: '10px'
  }
  const botMessage = {
    padding: 0,
    backgroundColor: 'transparent'
  }
  return (
    <article key={key} className='media' style={margin}>
      <div className='media-content'>
        { message.username
          ? <div className='content' style={otherMessage}>
            <p>
              <small className='has-text-light'>
                { message.date.split(',')[0] === new Date().toLocaleString().split(',')[0]
                  ? message.date.split(',')[1]
                  : message.date.split(',')[0]
              }
              </small>
              <br />
              <i className='has-text-light'>{message.username}</i>
              <br />
              <strong className='has-text-white'>{message.body}</strong>
            </p>
          </div>
            : <div className='content' style={botMessage}>
              <strong>{message.body}</strong>
            </div>
        }
      </div>
      { message.username
      ? <figure className='media-right'>
        <p className='image is-64x64'>
          <img src={message.profile_pic} />
        </p>
      </figure>
      : null
      }
    </article>
  )
}

export default Messages
