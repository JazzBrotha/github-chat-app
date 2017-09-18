import React from 'react'
function OwnMessage ({ message, removeMessage, key }) {
  const margin = {
    margin: '10px'
  }
  const ownMessage = {
    backgroundColor: 'whitesmoke',
    padding: '10px'
  }
  return (
    <article key={key} className='media' style={margin}>
      <figure className='media-left'>
        <p className='image is-64x64'>
          <img src={message.profile_pic} />
        </p>
      </figure>
      <div className='media-content'>
        <div className='content' style={ownMessage}>
          <p>
            <small>
              { message.date.split(',')[0] === new Date().toLocaleString().split(',')[0]
                ? message.date.split(',')[1]
                : message.date.split(',')[0]
              }
            </small>
            <br />
            <i>{message.username}</i>
            <br />
            <strong>{message.body}</strong>
          </p>
        </div>
      </div>
      <div className='media-right'>
        <button onClick={() => removeMessage(message.id)} className='delete' />
      </div>
    </article>
  )
}

export default OwnMessage
