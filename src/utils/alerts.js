import swal from 'sweetalert'
export default {
  roomCreated: () => {
    swal({
      icon: 'success',
      text: 'Room created!'
    })
  },
  roomExists: () => {
    swal({
      icon: 'error',
      text: 'Room already exists'
    })
  },
  roomDeleted: () => {
    swal('Room was deleted', {
      icon: 'success'
    })
  },
  invitationSent: user => {
    swal({
      icon: 'success',
      text: `Invitation sent to ${user}`
    })
  }
}
