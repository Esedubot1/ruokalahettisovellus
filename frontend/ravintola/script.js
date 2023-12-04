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
    await fetch(`http://localhost:${PORT}/api/orders/from/thisrestaurant`, {headers: {"Authorization": "Bearer " + token}})
        .then(response => response.json())
        .then(data => data.forEach(element => {
            orders.push(element)
        }))
    console.log(orders)

    createDivs()
}

async function createDivs(){
    // Funktio getRestaurantOrders hakee tilaukset datastoragesta ja laittaa ne orders arrayhin. 
    // Pitäisi tehdä niin, että kenttään restaurant-orders HTML:ässä tulisi näkyviin kaikki tilaukset. Esimerkkiä voi katsoa User sivulta
    // Jokaisella tilauksella pitäisi olla Tilauksen numero, esim: Order 1, Order 2 etc, tilauksella pitäisi näkyä se ravintola mistä se on tilattu, tilauksen sisältö ja button millä tilauksen voi merkata valmiiksi

    // Suosittelen käyttämään for looppia tätä varten.
    // Koodi millä saa ravintolan nimen backendistä on seuraava

    // let res = await fetch(`http://localhost:${PORT}/api/restaurants/${orders[i].restaurant}`)
    // let restaurant = await res.json()
    // console.log(restaurant.name)

    // Tarvittaessa voi katsoa mallia asiakas folderista, riviltä 227 alaspäin. Siellä oleva koodi on hyvin samanlainen mitä tässä pitää käyttää
}

async function markAsDone(event){
    let orderId = event.target.id

}