 /* Tokenin haku */
 const loggedRestaurantJSON = window.localStorage.getItem('loggedRestaurant')
 const restaurant = JSON.parse(loggedRestaurantJSON)
 const token = restaurant.token