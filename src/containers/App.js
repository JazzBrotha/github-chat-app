import React, { Component } from 'react'
import '../containers/bulma.css'
import '../containers/App.css'
import firebase, { auth, provider } from '../api/firebase'
import Header from '../components/header'
import Navbar from '../components/navbar'
import Message from '../components/message'
import Lobby from '../components/lobby'
import UserProfile from '../components/userProfile'
import AddItem from '../components/addItem'
import Menu from '../components/menu'
import DisplayItem from '../components/displayItem'

// Main class
class App extends Component {

  state = {
    currentItem: '',
        username: '',
        items: [],
        user: null,
        messages: [],
        date: Date
  }

// Custom Methods
  handleSubmit = e => {
    e.preventDefault()
    const itemsRef = firebase.database().ref('items')
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email,
      date: Date.now()
    }
    if (this.state.items.length) {
      itemsRef.push(item)
      this.setState({
        currentItem: '',
        username: '',
        date: Date.now()
      })
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logout = () => {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      })
    })
  }
  login = () => {
    auth.signInWithRedirect(provider)
    .then(result => {
      const user = result.user
      this.setState({
        user
      })
    })
  }

  removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/items/${itemId}`)
    itemRef.remove()
  }

// Mountings
  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })
    const itemsRef = firebase.database().ref('items')
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val()
      let newState = []
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user,
          date: items[item].date
        })
      }
      this.setState({
        items: newState
      })
    })
  }

// Render
  render () {
    return (
      <div className='app'>
        { this.state.user
          ? <div className='columns'>
            <div className='column is-2 p-0'>
              <Menu
                onClick={this.logout}
                src={this.state.user.photoURL}
              />
            </div>
            <div className='column is-10 p-0'>
              <Lobby
                onSubmit={this.handleSubmit}
                items={this.state.items}
                onChange = {this.handleChange}
                username = {this.state.username}
                currentItem = {this.state.currentItem}
                removeItem = {this.removeItem}
              />
            </div>
          </div>
          : <div className='container'>
            <Header
              name='Login'
              onClick={this.login}
            />
          </div>
        }
      </div>
    )
  }
}

export default App