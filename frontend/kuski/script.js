 /* Tokenin haku */
const loggedDelivererJSON = window.localStorage.getItem('loggedDeliverer')
const deliverer = JSON.parse(loggedDelivererJSON)
const token = deliverer.token

async function getOrders() {
  const orders = []
  document.getElementById("allOrders").innerHTML = null
  document.getElementById("myOrders").innerHTML = null
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

      // Deliver button
      let deliverButton = document.createElement("button")
      deliverButton.id = i
      deliverButton.className = "newRestaurantButton"
      deliverButton.innerHTML = "Deliver"
      deliverButton.addEventListener("click", () => updateOrder(orders[i].id))
      if(orders[i].status === 1) {
        newOrderDiv.appendChild(newOrderButton)
      }

      // Done button
      let doneButton = document.createElement("button")
      doneButton.id = i
      doneButton.className = "newRestaurantButton"
      doneButton.innerHTML = "Mark as delivered"
      doneButton.addEventListener("click", () => updateOrder(orders[i].id))
      if(orders[i].status === 2 && orders[i].deliverer === deliverer.id) {
        newOrderDiv.appendChild(doneButton)
      }

      if(orders[i].deliverer === deliverer.id) {
        document.getElementById("myOrders").appendChild(newOrderDiv)
        newOrderName.innerHTML = ("Order " + document.getElementById("myOrders").childElementCount)
      } else if(orders[i].status < 2) {
        document.getElementById("allOrders").appendChild(newOrderDiv)
        newOrderName.innerHTML = ("Order " + document.getElementById("allOrders").childElementCount)
      }

      console.log("---")
  }
}

async function updateOrder(order) {
    await fetch(`http://localhost:3001/api/orders/${order}`, {
        method: "PUT",
        headers: {"Authorization": "Bearer " + token}
    })
}

document.querySelector('#refreshButton').addEventListener("click", getOrders)