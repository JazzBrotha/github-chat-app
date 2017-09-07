import React from 'react'
function UserProfile (props) {
  return (
    <div className='user-profile'>
      <img src={props.src} />
    </div>
  )
}

export default UserProfile
