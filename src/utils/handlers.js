const closeModal = (modalId) => {
  const modal = document.getElementById(modalId)
  modal.classList.remove('is-active')
}

export {closeModal}
