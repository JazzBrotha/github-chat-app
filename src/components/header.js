import React from 'react'
function Header ({ onClick, name }) {
  return (
    <div className='modal is-active'>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Log In</p>
          <button
            className='delete'
            aria-label='close'
          />
        </header>
        <section className='modal-card-body'>
          <p>Log in with your GitHub account to get started.</p>
        </section>
        <footer className='modal-card-foot'>
          <button
            className='button is-success'
            onClick={onClick}>{name}
          </button>
          <button className='button'>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default Header
