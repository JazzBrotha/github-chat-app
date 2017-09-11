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
    currentMessage: '',
    username: '',
    messages: [],
    user: null,
    date: Date,
    users: [],
    rooms: [],
    currentRoom: ''
  }

// Custom Methods
  handleSubmit = e => {
    e.preventDefault()
    const messagesRef = firebase.database().ref('messages')
    const date = new Date()
    const day = date.getUTCDate() 
    let year = date.getUTCFullYear()
    let month = date.getUTCMonth()
    month = ("0" + (month + 1)).slice(-2)
    year = year.toString().substr(2,2) 
    const formattedDate = day + '/' + month + "/" + year
    
    const message = {
      body: this.state.currentMessage,
      username: this.state.user.displayName || this.state.user.email,
      profile_pic: this.state.user.photoURL,
      date: formattedDate
    }
      messagesRef.push(message)
      this.setState({
        currentMessage: '',
        username: '',
        date: formattedDate
      })
  }


  handleChange = e => {
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

  removeMessage = messageId => {
    const messageRef = firebase.database().ref(`/messages/${messageId}`)
    messageRef.remove()
  }

  createRoom = name => {
    const roomsRef = firebase.database().ref('rooms')
    const room = {
      name: name,
      users: []
    }
    room.users.push(this.state.user.email)
    roomsRef.push(room)
  }

  displayRoomInput = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Type room name and press enter')
    const createRoomContainer = document.getElementById('create-room-container')
    createRoomContainer.appendChild(input)
    input.addEventListener('keyup', (e) => {
      if (input.value.length > 0) {
        if (e.which === 13) {
        this.createRoom(input.value)
        createRoomContainer.removeChild(input)
      }
      }
    })
  }


// Mountings
  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })
    const messagesRef = firebase.database().ref('messages')
    messagesRef.on('value', (snapshot) => {
      let messages = snapshot.val()
      let newState = []
      for (let message in messages) {
        newState.push({
          id: message,
          body: messages[message].body,
          username: messages[message].username,
          profile_pic: messages[message].profile_pic,
          date: messages[message].date
        })
      }
      this.setState({
        messages: newState
      })
    })
    const usersRef = firebase.database().ref('users')
    usersRef.on('value', (snapshot) => {
      const users = snapshot.val()
      let userArr = []
      for (const user in users) {
        userArr.push(users[user])
      }
      const activeUser = this.state.user.email
      if (!userArr.includes(activeUser)) {
        usersRef.push(activeUser)      
        userArr.push(activeUser)
      }
      this.setState({
        users: userArr
      })
  })
  const roomsRef = firebase.database().ref('rooms')
  roomsRef.on('value', (snapshot) => {
    const rooms = snapshot.val()
    let roomsArr = []
    for (const room in rooms) {
      roomsArr.push({
        id: room,
        name: rooms[room].name,
        users: rooms[room].users
      })
    }
    this.setState({
      rooms: roomsArr
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
                displayRoomInput={this.displayRoomInput}
                rooms={this.state.rooms}
                username = {this.state.user.displayName || this.state.user.email}
              />
            </div>
            <div className='column is-10 p-0'>
              <Lobby
                onSubmit={this.handleSubmit}
                messages={this.state.messages}
                onChange = {this.handleChange}
                username = {this.state.user.displayName || this.state.user.email}
                currentMessage = {this.state.currentMessage}
                removeMessage = {this.removeMessage}
              />
            </div>
          </div>
          : <div className='container'>
            <Header
              name='Login'
              login={this.login}
            />
          </div>
        }
      </div>
    )
  }
}

export default App