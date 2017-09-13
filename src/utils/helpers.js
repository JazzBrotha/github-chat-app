const createFormattedDate = () => {
  const date = new Date()
  const day = date.getUTCDate()
  let year = date.getUTCFullYear()
  let month = date.getUTCMonth()
  month = ('0' + (month + 1)).slice(-2)
  year = year.toString().substr(2, 2)
  const formattedDate = day + '/' + month + '/' + year
  return formattedDate
}

const get = element => {
  const type = element.substr(0, 1)
  if (type === '#') {
    const id = element.substring(1, element.length)
    return document.getElementById(id)
  } else if (type === '.') {
    const className = element.substring(1, element.length)
    return document.getElementsByClassName(className)
  } else {
    return document.getElementsByTagName(element)
  }
}

export { createFormattedDate, get }
