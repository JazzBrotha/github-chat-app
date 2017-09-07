import React from 'react'
function Lobby ({ onSubmit, onChange, username, currentItem, items, removeItem }) {
  return (
    <div>
      <div className='card test p-10'>
        <header className='card-header'>
          <p className='card-header-title'>Lobby</p>
        </header>
        <div className='card-content'>
          <div className='content'>
            <ul>
              { items.map((item) => {
                return (
                  <li key={item.id}>
                    <div className='box'>
                      <article className='media'>
                        <div className='media-left'>
                          <figure className='image is-64x64'>
                            <img src='http://bulma.io/images/placeholders/128x128.png' alt='Image' />
                          </figure>
                        </div>
                        <div className='media-content'>
                          <div className='content'>
                            <p>
                              <strong>{item.user}</strong> <small>{item.user}</small> <small>{item.date}</small>
                              <br />
                              {item.title}
                              <button onClick={() => removeItem(item.id)}>Remove Item</button>
                            </p>
                          </div>
                          <nav className='level is-mobile'>
                            <div className='level-left'>
                              <a className='level-item'>
                                <span className='icon is-small'><i className='fa fa-reply' /></span>
                              </a>
                              <a className='level-item'>
                                <span className='icon is-small'><i className='fa fa-retweet' /></span>
                              </a>
                              <a className='level-item'>
                                <span className='icon is-small'><i className='fa fa-heart' /></span>
                              </a>
                            </div>
                          </nav>
                        </div>
                      </article>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className='card-footer' />
      </div>
      <div className='card testing p-10'>
        <header className='card-header'>
          <form name='messageForm' onSubmit={onSubmit}>
            <input type='text' name='username' placeholder="What's your name?" onChange={onChange} value={username} />
            <input type='text' name='currentItem' placeholder='What are you bringing?' onChange={onChange} value={currentItem} />
            <button type='submit' className='button'>Send</button>
          </form>
        </header>
        <div className='card-content' />
        <div className='card-footer' />
      </div>
    </div>
  )
}

export default Lobby
