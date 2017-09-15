import React, { Component } from 'react'
import '../containers/bulma.css'
import '../containers/App.css'
import firebase, { auth, provider } from '../api/firebase'
import Header from '../components/header'
import swal from 'sweetalert'
import Chat from '../components/chat'
import Menu from '../components/menu'
import Navbar from '../components/navbar'
import Notification from '../components/notification'
import inviteUserModal from '../components/inviteUserModal'
import { get } from '../utils/helpers'
import {
  toggleActiveRoomLinkColors,
  displayRoomInput,
  removeRoomInput,
  addUserLeftMessage,
  removeClass,
  addClass,
  changeInnerHtml 
} from '../utils/displays'
import Alert from '../utils/alerts'

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
    currentRoom: '',
    roomId: '',
    notification: ''
  }

// Custom Methods
  handleSubmit = e => {
    e.preventDefault()
    const messagesRef = firebase.database().ref('messages')
    const date = new Date().toLocaleString()  
    
    const message = {
      body: this.state.currentMessage,
      username: this.state.user.email,
      profile_pic: this.state.user.photoURL,
      date: date,
      room: this.state.currentRoom
    }
      messagesRef.push(message)
      this.setState({
        currentMessage: '',
        username: '',
        date: date,
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

  removeRoom = async (roomId) => {
    swal({
      title: `Are you sure you want to delete "${this.state.currentRoom}"?`,
      text: 'This cannot be undone',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(async willDelete => {
      if (willDelete) {
        const messagesSnapshot = await firebase.database()
        .ref(`messages`)
        .once('value')
        
        // Find messages that matches active room and remove
        const messages = messagesSnapshot.val()
        for (const message in messages) {
          const messageRoom = messages[message].room
          if (messageRoom === this.state.currentRoom) {
            firebase.database().ref(`/messages/${message}`).remove()
          }
        }
        const roomRef = firebase.database().ref(`/rooms/${roomId}`)
        roomRef.remove()
        Alert.roomDeleted()
      }
    })
  }

  createRoom = async name => {
    const roomsRef = firebase.database().ref('rooms')
    const roomsSnapshot = await roomsRef
      .orderByChild('name')
      .equalTo(name)
      .once('value')
    
      if (!roomsSnapshot.val()) {
        const room = {
          name: name,
          users: [],
          creator: this.state.user.email
        }
        room.users.push(this.state.user.email)
        roomsRef.push(room)
        Alert.roomCreated()
        this.toggleRooms(room)
      } else {
        Alert.roomExists()
      }
  }

  checkRoomInput = () => {
    const input = displayRoomInput()
    if (input) {
      input.addEventListener('keyup', (e) => {
        if (input.value.length > 0) {
          if (e.which === 13) {
          this.createRoom(input.value)
          removeRoomInput(input)
          this.toggleRooms(input.value)
        }
        }
      })
    }
  }
  toggleRooms = room => {
    room === 'Lobby'
    ? this.setState({
      currentRoom: room,
      roomCreator: '',
      roomId: ''
    })
    : this.setState({
      currentRoom: room.name,
      roomCreator: room.creator,
      roomId: room.id
    })
    toggleActiveRoomLinkColors(room.name || 'Lobby')
  }
  
  inviteUser = async () => {
    addClass('#invite-user-modal', 'is-active')
    const roomsRef = firebase.database().ref('rooms')
    const usersRef = firebase.database().ref('users')
    let roomUsers
    let roomId
    
    // Find room snapshot
    const roomSnapshot = await roomsRef
    .orderByChild('name')
    .equalTo(this.state.currentRoom)
    .once('value')
    
    // Get room object
    const roomObj = roomSnapshot.val()
    
    // Assign room key
    for (const prop in roomObj) {
      roomId = prop
    }
    
    this.setState({
      roomId: roomId
    })
    
    // Assign room users
    roomSnapshot.forEach(data => {
      roomUsers = data.val().users
    })
    
    const usersSnapshot = await usersRef.once('value')
    const usersObj = usersSnapshot.val()
    
    changeInnerHtml('#users-select', '=', '<option>User</option>')
    
    // Find users that are not in the selected room
    for (const user in usersObj) {
      if (!roomUsers.includes(usersObj[user])) {
        changeInnerHtml('#users-select', '+', `<option>${usersObj[user]}</option>`)
      }
    }
  }
  
  submitInviteUser = async () => {
    const room = this.state.currentRoom
    const userSelectValue = get('#users-select').value
    // Check if a user is selected
    if (userSelectValue !== 'User') {
      changeInnerHtml('#error-container', '=', '')
      // Get room users' snapshot
      const roomSnapshot = await firebase.database()
      .ref(`rooms/${this.state.roomId}/users`)
          .once('value')
        
        // Get room users' value
        let roomUsers = roomSnapshot.val()

        // Add new room user
        roomUsers.push(userSelectValue)

        // Update db ref
        firebase.database()
          .ref(`rooms/${this.state.roomId}/users`)
          .set(roomUsers)

        removeClass('#invite-user-modal', 'is-active')
        
        // this.setState({
        //   roomId: '',
        // })
        
        Alert.invitationSent(userSelectValue)
      } else {
      changeInnerHtml('#error-container', '=', '<p>Please select a user</p>')       
      }
    }

  leaveRoom = async roomId => {
    const roomSnapshot = await firebase.database()
    .ref(`rooms/${this.state.roomId}/users`)
    .once('value')
    
    // Get room users' value
    let roomUsers = roomSnapshot.val()
    
    // Get array index of user
    const index = roomUsers.indexOf(this.state.user.email)

    swal({
      title: `Are you sure you want to leave "${this.state.currentRoom}"?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        const room = this.state.currentRoom
        // Remove user from room
        roomUsers.splice(1, index)        
        
        // Update db ref
        firebase.database()
          .ref(`rooms/${this.state.roomId}/users`)
          .set(roomUsers)

        swal("Left", {
          icon: "success",
          text: `Left "${room}"` 
        })
      }
    })

    // Set room notification
    // firebase.database()
    //   .ref(`rooms/${this.state.roomId}/notification`)
    //   .set('User left channel')
    // addUserLeftMessage(this.state.user.email)
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
          date: messages[message].date,
          room: messages[message].room
        })
      }
      this.setState({
        messages: newState
      })
    })
    const usersRef = firebase.database().ref('users')
    usersRef.on('value', snapshot => {
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
        users: rooms[room].users,
        creator: rooms[room].creator
      })
    }
    this.setState({
      rooms: roomsArr,
    })
    this.toggleRooms('Lobby')
  })
  }

// Render
  render () {
    return (
      <div className='app'>
        { this.state.user
          ? <div className='modal is-active'>
            <div className="modal-background"></div>
            <div className='modal-card'>
              <Navbar
                currentRoom = {this.state.currentRoom}
                logout = {this.logout}
                username = {this.state.user.email}
                toggleRooms = {this.toggleRooms}
                rooms = {this.state.rooms}
              />
            <section className="modal-card-body">
              <Chat
                submitMessage ={this.handleSubmit}
                messages ={this.state.messages}
                onChange = {this.handleChange}
                username = {this.state.user.email}
                currentMessage = {this.state.currentMessage}
                removeMessage = {this.removeMessage}
                removeRoom = {this.removeRoom}                
                currentRoom = {this.state.currentRoom}
                roomCreator = {this.state.roomCreator}
                roomId = {this.state.roomId}                
                inviteUser = {this.inviteUser}
                submitInviteUser = {this.submitInviteUser}
                leaveRoom = {this.leaveRoom}
                currentRoom = {this.state.currentRoom}
                submitInviteUser = {this.submitInviteUser}
                inviteUserModal = {inviteUserModal}
                />
            </section>
            <footer className="modal-card-foot">
            { this.state.currentRoom !== 'Lobby'
            ? <Menu
                onClick = {this.logout}
                checkRoomInput = {this.checkRoomInput}
                rooms = {this.state.rooms}
                username = {this.state.user.email}
                toggleRooms = {this.toggleRooms}
                inviteUser = {this.inviteUser}
                roomCreator = {this.roomCreator}
                removeRoom = {this.removeRoom} 
                leaveRoom = {this.leaveRoom}
                roomId = {this.state.roomId} 
              />
            : null
            }
            </footer>
          </div>
        </div>
          : <div className='container'>
            <Header
              name='Login'
              login = {this.login}
            />
          </div>
        }
      </div>
    )
  }
}

export default App