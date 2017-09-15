import React from 'react'
import OwnMessage from './ownMessage'
import OtherMessage from './otherMessage'
function Chat ({
  submitMessage,
  onChange,
  username,
  currentMessage,
  removeMessage,
  message
}) {
  return (
    <div>
      { message.username === username
          ? <OwnMessage
            message={message}
            removeMessage={removeMessage}
            />
          : <OtherMessage message={message} />
      }
    </div>
  )
}

export default Chat
