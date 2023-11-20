 /* Tokenin haku */
const loggedDelivererJSON = window.localStorage.getItem('loggedDeliverer')
const deliverer = JSON.parse(loggedDelivererJSON)
const token = deliverer.token

async function getOrders() {
  const orders = []
  document.getElementById("orders").innerHTML = null
  await fetch("http://localhost:3001/api/orders/")
      .then(response => response.json())
      .then(data => data.forEach(element => {
          orders.push(element)
      }))
  console.log(orders)

  for (let i = 0; i < orders.length; i++) {
      console.log("Order number: " + (i + 1))
      // Creates Order Div for Order page
      let newOrderDiv = document.createElement("div")
      newOrderDiv.className = "newOrderDiv"
      document.getElementById("orders").appendChild(newOrderDiv)

      // Name of the div
      let newOrderName = document.createElement("h1")
      newOrderName.innerHTML = ("Order " + (i + 1))
      newOrderDiv.appendChild(newOrderName)

      // Restaurant name
      let newOrderRestaurant = document.createElement("p")
      let res = await fetch(`http://localhost:3001/api/restaurants/${orders[i].restaurant}`)
      let restaurant = await res.json()
      console.log(restaurant.name)
      newOrderRestaurant.innerHTML = (restaurant.name)
      newOrderDiv.appendChild(newOrderRestaurant)

      // Status
      let newOrderStatus = document.createElement("p")
      let currentStatus = orders[i].status
      if (currentStatus == 0){
          newOrderStatus.innerHTML = "Status: Cooking"
      } else if (currentStatus == 1){
          newOrderStatus.innerHTML = "Status: Done"
      } else if (currentStatus == 2){
          newOrderStatus.innerHTML = "Status: Delivering"
      } else if (currentStatus == 3){
          newOrderStatus.innerHTML = "Status: Delivered!"
      }

      newOrderDiv.appendChild(newOrderStatus)
      console.log("Staus: " + currentStatus)

      // Show Order button
      /* let newOrderButton = document.createElement("button")
      newOrderButton.id = i
      newOrderButton.className = "newRestaurantButton"
      newOrderButton.innerHTML = "Show"
      newOrderButton.addEventListener("click", showOrder)
      newOrderDiv.appendChild(newOrderButton) */

      console.log("---")
  }
}

document.querySelector('#xdbutton').onclick=(() => {getOrders()})