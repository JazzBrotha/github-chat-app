import React from 'react'
function AddItem (props) {
  return (
    <section className='add-item'>
      <h3>Create Chat Room</h3>
      <form onSubmit={props.onSubmit}>
        <input type='text' name='username' placeholder="What's your name?" value={props.userValue} />
        <input type='text' name='currentItem' placeholder='Room Name' onChange={props.onChange} value={props.itemValue} />
        <button>Add Item</button>
        <p>Rooms remaining: {props.roomsRemaining}</p>
      </form>
    </section>
  )
}
export default AddItem
