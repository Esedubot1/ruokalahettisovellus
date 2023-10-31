 /* Tokenin haku */
const loggedDelivererJSON = window.localStorage.getItem('loggedDeliverer')
const deliverer = JSON.parse(loggedDelivererJSON)
const token = deliverer.token