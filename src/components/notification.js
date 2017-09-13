import React from 'react'
function Notification ({ notification }) {
  const style = {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1
  }
  return (
    <div className='notification' style={style}>
      <button className='delete' />
      <h3>{notification}</h3>
    </div>
  )
}

export default Notification
