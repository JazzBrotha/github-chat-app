import React, { Component } from 'react'
import '../containers/bulma.css'
import '../containers/App.css'
import firebase, { auth, provider } from '../api/firebase'
import Header from '../components/header'
import swal from 'sweetalert'
import Chat from '../components/chat'
import Navbar from '../components/navbar'
import InviteUserModal from '../components/inviteUserModal'
import CreateRoomModal from '../components/createRoomModal'
import SendMessageCard from '../components/sendMessageCard'
import { get } from '../utils/helpers'
import {
  removeClass,
  addClass,
  changeInnerHtml,
  getRoomInput 
} from '../utils/displays'
import { scrollToBottom } from '../utils/events'
import Alert from '../utils/alerts'

// Main class
class App extends Component {

  state = {
    currentMessage: '',
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
  handleSubmit = async e => {
    e.preventDefault()
    const length = this.state.currentMessage.trim().length
    if (length > 0) {
      try {
        const messagesRef = firebase.database().ref('messages')
        const date = new Date().toLocaleString()  
        
        const message = {
          body: this.state.currentMessage.trim(),
          username: this.state.user.email,
          profile_pic: this.state.user.photoURL,
          date: date,
          room: this.state.currentRoom || 'Lobby'
        }
          messagesRef.push(message)
          this.setState({
            currentMessage: '',
            date: date,
          })
          scrollToBottom()
      } catch (err) {
        console.log(err)
        Alert.displayError('Sorry, could not create message')
      } 
    } else {
      Alert.displayError('Message empty')
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logout = async () => {
    try {
      auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
    } catch(err) {
      console.log(err)
      Alert.displayError('Sorry, could not logout')            
    }

  }
  login = async () => {
    try {
      auth.signInWithRedirect(provider)
      .then(result => {
        const user = result.user
        this.setState({
          user
        })
      })
   } catch (err) {
     console.log(err)
     Alert.displayError('Sorry, could not login')                 
   }
  }

  removeMessage = async messageId => {
    try {
      const messageRef = firebase.database().ref(`/messages/${messageId}`)
      messageRef.remove()
    } catch (err) {
      console.log(err)
      Alert.displayError('Sorry, could not remove message')      
    }
  }

  removeRoom = async (roomId) => {

    // Show confirm message
    swal({
      title: `Are you sure you want to delete "${this.state.currentRoom}"?`,
      text: 'This cannot be undone',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(async willDelete => {
      if (willDelete) {
        try {
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
          this.toggleRooms('Lobby')
        } catch (err) {
          console.log(err)
          Alert.displayError('Sorry, could not remove room')
        }
      }
    })
  }

  createRoom = async name => {
    if (name.length > 0) {
    try {
      const roomsRef = firebase.database().ref('rooms')
  
      // Check if room name exists
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

        // Push user to room
        room.users.push(this.state.user.email)

        // Push room to rooms
        roomsRef.push(room)

        Alert.roomCreated()
        removeClass('#create-room-modal', 'is-active')
        this.toggleRooms(room)
      } else {
        Alert.roomExists()
      }
    } catch (err) {
      console.log(err)
      Alert.displayError('Sorry, could not create room')      
    }
  } else {
    Alert.displayError('Room name empty')
  }
  }

  submitCreateRoom = () => {
    const roomName = getRoomInput()
    this.createRoom(roomName)
    this.toggleRooms(roomName)
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
  }
  
  inviteUser = async () => {
    addClass('#invite-user-modal', 'is-active')

    // Find room snapshot
    try {
      const roomsRef = firebase.database().ref('rooms')
      const usersRef = firebase.database().ref('users')
      let roomUsers
      let roomId
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
    } catch (err) {
      console.log(err)
      Alert.displayError('Sorry, could not invite user')
    }
  }
  
  submitInviteUser = async () => {
    try {
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
          
          Alert.invitationSent(userSelectValue)
          const messagesRef = firebase.database().ref('messages')
          
          // Add join message to room
          const message = {
            body: `${userSelectValue} joined room`,
            room: this.state.currentRoom,
            date: '',
            profile_pic: '',
            username: ''
          }
            messagesRef.push(message)
        } else {
        changeInnerHtml('#error-container', '=', '<p>Please select a user</p>')       
        }

    } catch (err) {
      console.log(err)
      Alert.displayError('Sorry, user could not join room')      
    }
    }

  leaveRoom = async roomId => {
    try {
      const roomSnapshot = await firebase.database()
      .ref(`rooms/${this.state.roomId}/users`)
      .once('value')
      
      // Get room users' value
      let roomUsers = roomSnapshot.val()
      
      // Get array index of user
      const index = roomUsers.indexOf(this.state.user.email)
  
      // Confirm message
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
  
            const messagesRef = firebase.database().ref('messages')
            
            // Add left message to room
            const message = {
              body: `${this.state.user.email} left room`,
              room: this.state.currentRoom,
              date: '',
              profile_pic: '',
              username: ''
            }
              messagesRef.push(message)
          
          this.toggleRooms('Lobby')
          Alert.confirmLeaveRoom(room)
        }
      })
    } catch (err) {
      console.log(err)
      Alert.displayError('Sorry, user could not leave room')  
    }
  }

// Mountings
componentWillMount = () => {

  // Check if user is logged in
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user })
    }
  })
}
  componentDidMount = async () => {
    try {
      // Get all messages
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
  
      // Get any new user
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
  
    // Switch to lobby if user is in deleted room
    firebase.database().ref("rooms")
    .on('child_removed', (snapshot) => {
      const roomName = snapshot.val().name
      if (this.state.currentRoom === roomName) {
        this.toggleRooms('Lobby')
      }
    })
  
    // Get all rooms
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
    })
  
    // Place user in appropriate room
    this.setState({
      currentRoom: this.state.currentRoom || 'Lobby'
    })

    } catch (err) {
      console.log(err)
      Alert.displayError('Sorry, could not launch app')  
    }
  }

// Render
  render () {
    return (
      <div className='app'>
        { this.state.user
          ? <div className='modal is-active'>
            <InviteUserModal
              currentRoom = {this.state.currentRoom}
              submitInviteUser = {this.submitInviteUser}
            />
            <CreateRoomModal
              submitCreateRoom = {this.submitCreateRoom}
            />
            <div className="modal-background"></div>
            <div className='modal-card'>
              <Navbar
                currentRoom = {this.state.currentRoom}
                logout = {this.logout}
                username = {this.state.user.email}
                toggleRooms = {this.toggleRooms}
                rooms = {this.state.rooms}
                checkRoomInput={this.checkRoomInput}
              />
            <section className="modal-card-body" id='message-container'>
            { this.state.messages.map((message, index) => {
              return (
                message.room === this.state.currentRoom
              ? <Chat
                submitMessage ={this.handleSubmit}
                message = {message}
                key={message.id}
                onChange = {this.handleChange}
                username = {this.state.user.email}
                currentMessage = {this.state.currentMessage}
                removeMessage = {this.removeMessage}               
                />
                : null
              )
            })
          }
            </section>
            <footer className="modal-card-footer">
            <SendMessageCard
              submitMessage={this.handleSubmit}
              onChange={this.handleChange}
              currentMessage={this.state.currentMessage}
              username = {this.state.user.email}
              checkRoomInput = {this.checkRoomInput}
              inviteUser = {this.inviteUser}
              roomCreator = {this.state.roomCreator}
              removeRoom = {this.removeRoom} 
              leaveRoom = {this.leaveRoom}
              roomId = {this.state.roomId} 
              currentRoom = {this.state.currentRoom || 'Lobby'}
            />
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