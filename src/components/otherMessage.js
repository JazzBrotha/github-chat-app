import React from 'react'

function Messages ({ message, key }) {
  const margin = {
    margin: '10px'
  }
  const otherMessage = {
    backgroundColor: '#3273dc',
    padding: '10px'
  }
  return (
    <article key={key} className='media' style={margin}>
      <div className='media-content'>
        <div className='content' style={otherMessage}>
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
      </div>
        <figure className='media-right'>
        <p className='image is-64x64'>
          <img src={message.profile_pic} />
        </p>
      </figure>
    </article>
  )
}

export default Messages
