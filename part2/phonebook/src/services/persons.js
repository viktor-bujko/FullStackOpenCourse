import axios from 'axios';

const baseURL = 'http://localhost:3001/persons'

const getPeople = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createPerson = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (personId) => {
    const request = axios.delete(`${baseURL}/${personId}`)
    return request.then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    const request = axios.put(`${baseURL}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const exports = { getPeople, createPerson, deletePerson, updatePerson }

export default exports