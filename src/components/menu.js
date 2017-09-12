import React from 'react'
function Menu ({onClick, src, displayRoomInput, rooms, username, toggleRooms}) {
  return (
    <aside className='menu message-menu'>
      <p className='menu-label'>
    Rooms
      </p>
      <ul className='menu-list'>
        <li>
          <ul id='room-list'>
            <li onClick={() => toggleRooms('Lobby')}><a>Lobby</a></li>
            { rooms.map(room => {
              if (room.users.includes(username)) {
                return (
                  <li key={room.id} onClick={() => toggleRooms(room)}>
                    <a className='room-link-item'>{room.name}</a>
                  </li>
                )
              }
            })
          }
          </ul>
        </li>
      </ul>
      <div id='create-room-container'>
        <li>Create Room <a onClick={displayRoomInput}><i className='fa fa-plus' aria-hidden='true' /></a></li>
      </div>
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
