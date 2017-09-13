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
  deleteRoom: (room) => {
    swal({
      title: `Are you sure you want to delete "${room}" ?`,
      text: 'This cannot be undone',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(willDelete => {
      if (willDelete) {
        swal('Room was deleted', {
          icon: 'success'
        })
      } else {
        swal('Delete room aborted')
      }
    })
  }
}
