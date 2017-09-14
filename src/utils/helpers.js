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

export { get }
