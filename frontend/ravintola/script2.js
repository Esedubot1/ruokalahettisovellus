/* Tokenin haku */
const loggedRestaurantJSON = window.localStorage.getItem('loggedRestaurant')
const restaurant = JSON.parse(loggedRestaurantJSON)
if (restaurant === null) {
    window.location.href = "index.html"
}
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

    createDivs()
    getProducts()
}

async function createDivs(){
    let ordersDiv = document.getElementById("restaurant-orders")
    ordersDiv.innerHTML = null
    for (let i = 0; i < orders.length; i++){
        // Order div
        let newOrderDiv = document.createElement("div")
        newOrderDiv.className = "newOrderDiv"
        ordersDiv.appendChild(newOrderDiv)

        // Order Name
        let newOrderName = document.createElement("h1")
        newOrderName.className = "newOrderName"
        newOrderName.innerHTML = "Order " + (i + 1)
        newOrderDiv.appendChild(newOrderName)

        // Products
        let newOrderIngredients = document.createElement("ul")
        for(let x = 0; x < orders[i].products.length; x++) {
            let res = await fetch(`http://localhost:3001/api/products/${orders[i].products[x]}`)
            let product = await res.json()
            let productName = document.createElement("li")
            productName.innerHTML = product.name
            newOrderIngredients.appendChild(productName)
        }
        newOrderDiv.appendChild(newOrderIngredients)

        // Order status
        let orderStatus = document.createElement("p")
        switch (orders[i].status) {
          case 0:
            orderStatus.innerHTML = 'Cooking'
            break
          case 1:
            orderStatus.innerHTML = 'Awaiting delivery'
            break
          case 2:
            orderStatus.innerHTML = 'Delivering'
            break
          case 3:
            orderStatus.innerHTML = 'Delivered!'
            break
        }
        newOrderDiv.appendChild(orderStatus)

        // Mark order as done button
        let orderDoneButton = document.createElement("button")
        orderDoneButton.innerHTML = "Mark done"
        orderDoneButton.className = "newRestaurantButton"
        orderDoneButton.id = i
        orderDoneButton.addEventListener("click", () => updateOrder(orders[i].id))
        if(orders[i].status === 0) {
          newOrderDiv.appendChild(orderDoneButton)
        }
    }
}

async function updateOrder(order) {
  await fetch(`http://localhost:${PORT}/api/orders/${order}`, {
      method: "PUT",
      headers: {"Authorization": "Bearer " + token}
  })
}

async function getProducts() {
    products = []
    document.getElementById("restaurant-order-productions").innerHTML = null
    await fetch(`http://localhost:3001/api/products/from/${restaurant.id}`)
        .then(response => response.json())
        .then(data => data.forEach(element => {
            products.push(element)
        }))
    let res = await fetch(`http://localhost:3001/api/restaurants/${restaurant.id}`)
    let restaurantName = await res.json()
    /* document.getElementById("restaurant-name").innerHTML = ("From: " + restaurantName.name) */
    products.forEach(element => {
        //Product div
        let newProductionDiv = document.createElement("div")
        newProductionDiv.className = "newProductionDiv"
        document.getElementById("restaurant-order-productions").appendChild(newProductionDiv)

        // Product name
        let newProductionName = document.createElement("h1")
        newProductionName.innerHTML = element.name
        newProductionDiv.appendChild(newProductionName)

        // Product price 
        let newProductionPrice = document.createElement("p")
        newProductionPrice.innerHTML = (`Product price: ${element.price}`)
        newProductionDiv.appendChild(newProductionPrice)

        // Production ingredients
        let newProductionIngredient = document.createElement("p")
        newProductionIngredient.innerHTML = element.ingredients
        newProductionDiv.appendChild(newProductionIngredient)

        let editProductButton = document.createElement("button")
        editProductButton.innerHTML = "Edit"
        editProductButton.className = "newRestaurantButton"
        editProductButton.addEventListener("click", () => {
          selectedProductId = element.id
          document.getElementById('addProductForm').style = 'display: none'
          document.getElementById('editProductForm').style = 'display: block'
          document.getElementById('editingText').innerHTML = 'Editing ' + element.name
        })
        newProductionDiv.appendChild(editProductButton)

        let deleteProductButton = document.createElement("button")
        deleteProductButton.innerHTML = "Delete"
        deleteProductButton.className = "newRestaurantButton"
        deleteProductButton.addEventListener("click", () => deleteProduct(element.id))
        newProductionDiv.appendChild(deleteProductButton)
    })
    console.log(products)
}

async function addProduct() {
  const name = document.getElementById('newProductName').value
  const price = document.getElementById('newProductPrice').value
  const ingredients = document.getElementById('newProductIngredients').value
  
  if(name === '' || price === '') {
    document.getElementById("error-text").innerHTML = 'Name and price are required.'
    setTimeout(() => {
      document.getElementById("error-text").innerHTML = null
    }, 2000)
    return
  }

  await fetch(`http://localhost:${PORT}/api/products`, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({name: name, price: price, ingredients: ingredients})
  })

  document.getElementById('newProductName').value = ''
  document.getElementById('newProductPrice').value = ''
  document.getElementById('newProductIngredients').value = ''
}

let selectedProductId = ''
async function editProduct(id) {
  const name = document.getElementById('editProductName').value
  const price = document.getElementById('editProductPrice').value
  const ingredients = document.getElementById('editProductIngredients').value

  if(name === '' || price === '') {
    document.getElementById("error-text").innerHTML = 'Name and price are required.'
    setTimeout(() => {
      document.getElementById("error-text").innerHTML = null
    }, 2000)
    return
  }
  
  await fetch(`http://localhost:${PORT}/api/products/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({name: name, price: price, ingredients: ingredients})
  })

  document.getElementById('addProductForm').style = 'display: block'
  document.getElementById('editProductForm').style = 'display: none'

  document.getElementById('editProductName').value = ''
  document.getElementById('editProductPrice').value = ''
  document.getElementById('editProductIngredients').value = ''
}

async function deleteProduct(id) {
  await fetch(`http://localhost:${PORT}/api/products/${id}`, {
      method: "DELETE",
      headers: {"Authorization": "Bearer " + token}
  })
}