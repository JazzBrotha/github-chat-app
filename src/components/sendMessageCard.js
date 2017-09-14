import React from 'react'
function SendMessageCard ({ submitMessage, onChange, currentMessage }) {
  return (
    <div className='card testing p-10'>
      <header className='card-header'>
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
              <button className='button' type='submit'>
          Send
        </button>
            </p>
          </div>
        </form>
      </header>
    </div>
  )
}

export default SendMessageCard
