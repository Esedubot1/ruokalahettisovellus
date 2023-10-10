let restaurants = []


async function getRestaurants() {
    fetch("http://localhost:3001/api/restaurants")
        .then(response => response.json())
        .then(data => data.forEach(element => {
            restaurants.push(element)
        }))

    console.log(restaurants)
}

getRestaurants()


