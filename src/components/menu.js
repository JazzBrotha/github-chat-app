import React from 'react'
function Menu ({
  onClick,
  src,
  checkRoomInput,
  rooms,
  username,
  toggleRooms
}) {
  return (
    <aside className='menu message-menu'>
      <p className='menu-label'>
    Rooms
      </p>
      <ul className='menu-list'>
        <li>
          <ul id='room-list'>
            <li onClick={() => toggleRooms('Lobby')}><a className='room-link-item'>Lobby</a></li>
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
        <li><a onClick={checkRoomInput}>Create Room</a></li>
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
