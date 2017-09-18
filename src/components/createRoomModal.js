import React from 'react'
import { removeClass } from '../utils/displays.js'

function CreateRoomModal ({ submitCreateRoom }) {
  return (
    <div id='create-room-modal' className='modal'>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Create Room</p>
          <button onClick={() => removeClass('#create-room-modal', 'is-active')} className='delete' aria-label='close' />
        </header>
        <section id='create-room-modal-body' className='modal-card-body'>
          <div className='field'>
            <label className='label'>Room Name</label>
            <div className='control has-icons-left'>
              <input className='input is-success' type='text' placeholder='Name' id='room-name' />
              <span className='icon is-small is-left'>
                <i className='fa fa-building' />
              </span>
            </div>
          </div>
        </section>
        <footer className='modal-card-foot'>
          <button onClick={submitCreateRoom} className='button bd-tw-button'>Create</button>
          <button onClick={() => removeClass('#create-room-modal', 'is-active')} className='button'>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default CreateRoomModal
