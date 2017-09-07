import React from 'react'
function Menu ({onClick, src}) {
  return (
    <aside className='menu message-menu'>
  <p className='menu-label'>
    Rooms
  </p>
  <ul className='menu-list'>
    <li><a>Create Room</a></li>
    <li>
      <ul>
        <li><a>Lobby</a></li>
        <li><a>Room 2</a></li>
        <li><a>Room 3</a></li>
      </ul>
    </li>
  </ul>
  <p className='menu-label'>
    Profile
  </p>
  <ul className='menu-list'>
    <li><a>View</a></li>
    <li><a onClick={onClick}>Log Out</a></li>
  </ul>
  <div className='user-profile'>
      <img src={src} />
    </div>
</aside>
  )
}
export default Menu
