import React from 'react'
function DisplayItem (props) {
  return (
    <section className='display-item'>
      <div className='wrapper'>
        <ul>
          {props.items.map(item => {
            return (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>created by: {item.user}
                  {
                   item.user === props.displayName || item.user === props.email
                   ? <button onClick={() => props.onClick(item.id)}>Remove Item</button>
                   : null
                   }
                </p>
              </li>
            )
          })
          }
        </ul>
      </div>
    </section>
  )
}
export default DisplayItem
