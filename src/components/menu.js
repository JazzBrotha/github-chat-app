import React from 'react'
function Menu ({
  onClick,
  src,
  checkRoomInput,
  rooms,
  username,
  toggleRooms,
  inviteUser,
  roomCreator,
  leaveRoom,
  removeRoom,
  roomId
}) {
  return (
    <div className='tabs is-centered is-boxed'>
      <ul>
        <li className='is-active'>
          <a onClick={checkRoomInput}>
            <span className='icon is-small'><i className='fa fa-plus-square' /></span>
            <span>Create Room</span>
          </a>
        </li>
        <li>
          <a onClick={inviteUser}>
            <span className='icon is-small'><i className='fa fa-user-plus' /></span>
            <span>Invite User</span>
          </a>
        </li>
        <li>
          { roomCreator === username
        ? <a onClick={() => removeRoom(roomId)}>
          <span className='icon is-small'><i className='fa fa-trash' /></span>
          <span>Delete Room</span>
        </a>
        : <a onClick={() => leaveRoom(roomId)}>
          <span className='icon is-small'><i className='fa fa-sign-out' /></span>
          <span>Leave Room</span>
        </a>
        }
        </li>
        <li>
          <a>
            <span className='icon is-small'><i className='fa fa-user-plus' /></span>
            <span>Invite User</span>
          </a>
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
      }
  </div>
  )
}
export default Menu
