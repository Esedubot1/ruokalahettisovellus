

const getAll = () => {
    const request = fetch("http://localhost:3001/api/restaurants")
    return request
}


export default {getAll}