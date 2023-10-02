import axios from "axios"

const baseUrl = "/api/restaurants"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request
}

const getOne = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    console.log(request.data.name)
    return request.data.name
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}
  

export default {getAll, getOne, create, update, remove}