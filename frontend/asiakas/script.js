/* Tokenin haku */
const loggedUserJSON = window.localStorage.getItem('loggedUser')
const user = JSON.parse(loggedUserJSON)
const token = user.token
console.log("token: " + token)

let restaurants = []
let productions = []
let orders = []

let totalPrice = 0

async function getRestaurants() {
    await fetch("http://localhost:3001/api/restaurants")
        .then(response => response.json())
        .then(data => data.forEach(element => {
            restaurants.push(element)
        }))

    console.log(restaurants)
    createDivs()
}

// Creates the divs for Restaurants
function createDivs() {
    let restaurantCounter = 0
    restaurants.forEach(element => {

        // New Div for restaurant
        let restaurantContainer = document.getElementById("user-restaurants")
        let newRestaurant = document.createElement("div")
        newRestaurant.className = "newRestaurant"
        restaurantContainer.appendChild(newRestaurant)

        // Restaurant name
        let newRestaurantName = document.createElement("h1")
        newRestaurantName.className = "newRestaurantName"
        newRestaurantName.innerHTML = element.name
        newRestaurant.appendChild(newRestaurantName)

        // Restaurant adress
        let newRestaurantAddress = document.createElement("p")
        newRestaurantAddress.className = "newRestaurantAddress"
        newRestaurantAddress.innerHTML = element.address
        newRestaurant.appendChild(newRestaurantAddress)

        // Restaurant info button
        let newRestaurantButton = document.createElement("button")
        newRestaurantButton.className = "newRestaurantButton"
        newRestaurantButton.innerHTML = "Information"
        newRestaurantButton.id = restaurantCounter
        newRestaurantButton.addEventListener("click", openInfo)
        newRestaurant.appendChild(newRestaurantButton)

        restaurantCounter++
    })
}

getRestaurants()

function openInfo(event){
    let buttonId = event.target.id
    console.log(event.target)
    document.getElementById("restaurant-information").innerHTML = restaurants[buttonId].info

    getProducts(restaurants[buttonId].id)
}  

async function getProducts(id){
    productions = []
    let productCounter = 0
    document.getElementById("restaurant-products").innerHTML = null
    await fetch(`http://localhost:3001/api/products/from/${id}`)
        .then(response => response.json())
        .then(data => data.forEach(element => {
            productions.push(element)
        }))
    let res = await fetch(`http://localhost:3001/api/restaurants/${id}`)
    let restaurantName = await res.json()
    document.getElementById("restaurant-name").innerHTML = ("From: " + restaurantName.name)
    productions.forEach(element => {
        //Product div
        let newProductionDiv = document.createElement("div")
        newProductionDiv.className = "newProductionDiv"
        document.getElementById("restaurant-products").appendChild(newProductionDiv)

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


        // Order Button
        let newProductionButton = document.createElement("button")
        newProductionButton.innerHTML = "Add"
        newProductionButton.className = "newRestaurantButton"
        newProductionButton.id = productCounter
        newProductionButton.addEventListener("click", addOrder)
        newProductionDiv.appendChild(newProductionButton)

        productCounter++
    })
    console.log(productions)
}

function addOrder(event){
    let orderId = event.target.id
    let htmlPrice = document.getElementById("total-price")
    orders.push(productions[orderId])

    totalPrice = totalPrice + productions[orderId].price
    htmlPrice.innerHTML = totalPrice
    console.log(totalPrice)

    console.log(orders)

    orderUpdate()
}

async function orderUpdate(){
    let orderCounter = 0
    let ordersDiv = document.getElementById("ordersDiv")
    ordersDiv.innerHTML = null
    for (let i = 0; i < orders.length; i++){
        // Order Div
        let newOrderDiv = document.createElement("div")
        newOrderDiv.className = "newOrderDiv"
        ordersDiv.appendChild(newOrderDiv)

        // Order Name
        let newOrderName = document.createElement("h1")
        newOrderName.className = "newOrderName"
        newOrderName.innerHTML = orders[i].name
        newOrderDiv.appendChild(newOrderName)

        // Product Restaurant Name 
        let newOrderRestaurantName = document.createElement("p")
        let res = await fetch(`http://localhost:3001/api/restaurants/${orders[i].restaurant}`)
        let orderRestaurantName = await res.json()
        newOrderRestaurantName.innerHTML = orderRestaurantName.name
        newOrderDiv.appendChild(newOrderRestaurantName)

        // Price
        let newOrderPrice = document.createElement("p")
        newOrderPrice.innerHTML = orders[i].price
        newOrderDiv.appendChild(newOrderPrice)

        // Ingredients
        let newOrderIngredients = document.createElement("p")
        newOrderIngredients.innerHTML = orders[i].ingredients
        newOrderDiv.appendChild(newOrderIngredients)

        // Remove order Button
        let newOrderRemoveButton = document.createElement("button")
        newOrderRemoveButton.innerHTML = "Remove"
        newOrderRemoveButton.className = "newOrderRemoveButton"
        newOrderRemoveButton.id = orderCounter
        newOrderRemoveButton.addEventListener("click", deleteOrder)
        newOrderDiv.appendChild(newOrderRemoveButton)

        orderCounter++
    }
}

function deleteOrder(event){
    let orderId = event.target.id
    let orderPrice = orders[orderId].price
    let htmlPrice = document.getElementById("total-price")

    totalPrice = totalPrice - orderPrice
    htmlPrice.innerHTML = totalPrice
    console.log(totalPrice)

    orders.splice(orderId, 1)

    orderUpdate()
}

async function submitOrder(){
    // Check in subit folder is empty
    let name = document.getElementById("orderForumItemName").value
    let phoneNumber = document.getElementById("orderForumItemNumber").value
    let adress = document.getElementById("orderForumItemAdress").value
    let exampleRestaurant = orders[0].restaurant

    let productIDs = []
    
    orders.forEach(element => {
        console.log("restaurant:" + exampleRestaurant)
        if (element.restaurant != exampleRestaurant) {
            console.log("Please, order from one restaurant at time")
            productIDs = []
            return
        } else if (orders[0] == null){
            console.log("Order something")
            productIDs = []
            return
        } else if (name == "" || phoneNumber == null || adress == ""){
            console.log("Fill out the form")
            productIDs = []
            return
        }
        productIDs.push(element)
    })

    let res = await fetch(`http://localhost:3001/api/orders`, {
      method: "POST",
      body: JSON.stringify({restaurant: exampleRestaurant, products: productIDs}),
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}
    })

    productIDs = []
}


// Orders Page Functions 
let userOrders = []

async function getOrders() {
    userOrders = []
    document.getElementById("userOrders").innerHTML = null
    await fetch("http://localhost:3001/api/orders/from/thisuser", {headers: {"Authorization": "Bearer " + token}})
        .then(response => response.json())
        .then(data => data.forEach(element => {
            userOrders.push(element)
        }))
    console.log(userOrders)

    for (let i = 0; i < userOrders.length; i++) {
        console.log("Order number: " + (i + 1))
        // Creates Order Div for Order page
        let newUserOrderDiv = document.createElement("div")
        newUserOrderDiv.className = "newOrderDiv"
        document.getElementById("userOrders").appendChild(newUserOrderDiv)

        // Name of the div
        let newUserOrderName = document.createElement("h1")
        newUserOrderName.innerHTML = ("Order " + (i + 1))
        newUserOrderDiv.appendChild(newUserOrderName)

        // Restaurant name
        let newUserOrderRestaurant = document.createElement("p")
        let res = await fetch(`http://localhost:3001/api/restaurants/${userOrders[i].restaurant}`)
        let restaurant = await res.json()
        console.log(restaurant.name)
        newUserOrderRestaurant.innerHTML = (restaurant.name)
        newUserOrderDiv.appendChild(newUserOrderRestaurant)

        // Status
        let newUserOrderStatus = document.createElement("p")
        let currentStatus = userOrders[i].status
        if (currentStatus == 0){
            newUserOrderStatus.innerHTML = "Status: Cooking"
        } else if (currentStatus == 1){
            newUserOrderStatus.innerHTML = "Status: Done"
        } else if (currentStatus == 2){
            newUserOrderStatus.innerHTML = "Status: Delivering"
        } else if (currentStatus == 3){
            newUserOrderStatus.innerHTML = "Status: Delivered!"
        }

        newUserOrderDiv.appendChild(newUserOrderStatus)
        console.log("Staus: " + currentStatus)

        // Show Order button
        let newUserOrderButton = document.createElement("button")
        newUserOrderButton.id = i
        newUserOrderButton.className = "newRestaurantButton"
        newUserOrderButton.innerHTML = "Show"
        newUserOrderButton.addEventListener("click", showOrder)
        newUserOrderDiv.appendChild(newUserOrderButton)

        console.log("---")
    }
}


let userOrderProducts = []

async function showOrder(event){
    userOrderProducts = []
    document.getElementById("userProducts").innerHTML = null
    let userOrderId = event.target.id
    
    for (let i = 0; i < userOrders[userOrderId].products.length; i++){
        let res = await fetch(`http://localhost:3001/api/products/${userOrders[userOrderId].products[i]}`)
        let product = await res.json()
        console.log(product)

        // Product div
        let newOrderProductDiv = document.createElement("div")
        newOrderProductDiv.className = "newOrderDiv"
        document.getElementById("userProducts").appendChild(newOrderProductDiv)

        // Product Name
        let newOrderProductName = document.createElement("h1")
        newOrderProductName.innerHTML = product.name
        newOrderProductDiv.appendChild(newOrderProductName)

        // Product price
        let newOrderProductPrice = document.createElement("p")
        newOrderProductPrice.innerHTML = ("Price: " + product.price)
        newOrderProductDiv.appendChild(newOrderProductPrice)

        // Ingredients
        let newOrderProductIngredients = document.createElement("p")
        newOrderProductIngredients.innerHTML = product.ingredients
        newOrderProductDiv.appendChild(newOrderProductIngredients)

    }
}

