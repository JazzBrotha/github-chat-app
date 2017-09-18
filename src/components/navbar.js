import React from 'react'
import { addClass, toggleClass } from '../utils/displays'
function Navbar ({currentRoom, logout, toggleRooms, username, rooms, checkRoomInput}) {
  const navbarStyle = {
    zIndex: '3'
  }
  return (
    <nav className='navbar is-info' style={navbarStyle}>
      <div className='navbar-brand'>
        <div className='navbar-item'>
          <h3 className='is-size-3'>{currentRoom}</h3>
        </div>
        <div className='navbar-burger burger' data-target='main-nav' onClick={() => toggleClass('#main-nav', 'is-active')} >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div id='main-nav' className='navbar-menu'>
        <div className='navbar-start'>
          <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link'>
            Switch Room
          </a>
            <div className='navbar-dropdown'>
              <a onClick={() => toggleRooms('Lobby')} className='navbar-item'>Lobby</a>
              { rooms.map(room => {
                if (room.users.includes(username)) {
                  return (
                    <a key={room.id} onClick={() => toggleRooms(room)} className='navbar-item'>
                      {room.name}
                    </a>
                  )
                }
              })
          }
            </div>
          </div>
          <a onClick={() => addClass('#create-room-modal', 'is-active')} className='navbar-item'>Create Room</a>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='field is-grouped'>
              <p className='control'>
                <a onClick={logout} className='button bd-tw-button'>
                  <span className='icon'>
                    <i className='fa fa-power-off' />
                  </span>
                  <span>Log Out</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
