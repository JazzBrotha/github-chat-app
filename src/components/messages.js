import React from 'react'
function Messages (props) {
  return (
    <ul id='messages'>
      { props.messages.forEach(message => <li>
        {message}</li>) } 
    </ul>
  )
}

export default Messages
