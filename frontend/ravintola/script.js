 /* Tokenin haku */
 const loggedRestaurantJSON = window.localStorage.getItem('loggedRestaurant')
 const restaurant = JSON.parse(loggedRestaurantJSON)
 const token = restaurant.token

let orders = []

 async function getRestaurantOrders() {
    orders = []
    await fetch(`http://localhost:3001/api/orders/from/thisrestaurant`, {headers: {"Authorization": "Bearer " + token}})
        .then(response => response.json())
        .then(data => data.forEach(element => {
            orders.push(element)
        }))
    console.log(orders)

    // Pitäisi tehdä niin, että kenttään 
 }