import React from 'react'
import { removeClass } from '../utils/displays.js'

function inviteUserModal ({ currentRoom, submitInviteUser }) {
  return (
    <div id='invite-user-modal' className='modal'>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Invite users to "{currentRoom}"</p>
          <button onClick={() => removeClass('#invite-user-modal', 'is-active')} className='delete' aria-label='close' />
        </header>
        <section id='invite-user-modal-body' className='modal-card-body'>
          <div className='field'>
            <p className='control has-icons-left'>
              <span className='select'>
                <select id='users-select' />
              </span>
              <span className='icon is-small is-left'>
                <i className='fa fa-user' />
              </span>
            </p>
          </div>
          <p id='error-container' />
        </section>
        <footer className='modal-card-foot'>
          <button onClick={submitInviteUser} id='submit-invite-user' className='button bd-tw-button'>Invite</button>
          <button onClick={() => removeClass('#invite-user-modal', 'is-active')} className='button'>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default inviteUserModal
