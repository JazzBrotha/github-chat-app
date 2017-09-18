import {get} from './helpers'

export function scrollToBottom () {
  const messageContainer = get('#message-container')
  messageContainer.scrollTop = messageContainer.scrollHeight
}
