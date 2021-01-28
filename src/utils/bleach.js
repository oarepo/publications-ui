import bleach from 'bleach'

const descriptionOptions = {
  mode: 'white',
  list: [
    'em',
    'div',
    'p',
    'b',
    'i'
  ]
}

function sanitize (text) {
  return bleach.sanitize(text, descriptionOptions)
}

export { sanitize }
