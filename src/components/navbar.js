import React from 'react'
function Navbar ({currentRoom, logout, toggleRooms, username, rooms}) {
  return (
    <nav className='navbar is-info'>
      <div className='navbar-brand'>
        <a className='navbar-item'>
          <h3 className='is-size-3'>{currentRoom}</h3>
        </a>
      </div>
      <div id='navMenuColorinfo-example' className='navbar-menu'>
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
