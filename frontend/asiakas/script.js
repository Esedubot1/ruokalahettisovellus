// import backendService from "../service"

innateRestaurant = {}

function restaurantInfo(restaurantId){
    backendService.getOne(restaurantId).then(response => {
        innateRestaurant.push(response.data)
    })
}

// export default {restaurantInfo}
