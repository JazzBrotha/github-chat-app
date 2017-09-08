import React from 'react'
function Menu ({onClick, src, displayRoomInput}) {
  return (
    <aside className='menu message-menu'>
      <p className='menu-label'>
    Rooms 
      </p>
      <div id="test">
        <li>Create Room <a onClick={displayRoomInput}><i className='fa fa-plus-square-o' aria-hidden='true' /></a></li>
      </div>
      <ul className='menu-list'>
        <li>
          <ul>
            <li><a>Lobby</a></li>
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
    </aside>
  )
}
export default Menu
