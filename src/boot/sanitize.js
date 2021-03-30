import VueSanitize from 'vue-sanitize'

export default ({ Vue }) => {
  Vue.use(VueSanitize, {
    allowedTags: ['a', 'b', 'br', 'p', 'h1', 'h2', 'h3', 'strong', 'ul', 'li'],
    allowedAttributes: {
      a: ['href']
    }
  })
}
