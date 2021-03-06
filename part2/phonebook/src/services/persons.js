import axios from 'axios'
const url = 'http://localhost:3002/persons'

const getAll = () =>{
    const request = axios
    .get(url)
    return request.then(response => response.data)
}

const create = nameObject => {
    const request = axios
    .post(url, nameObject)
    return request.then(response=>response.data)
}

const elim = id => {
    const request = axios
    .delete(`${url}/${id}`)
    return request.then(response=>response.data)
}


export default {getAll, create, elim}