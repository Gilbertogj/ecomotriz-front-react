
import axios from "axios";

export const apiConcrecoUsers = axios.create({
    baseURL: process.env.REACT_APP_API_CONCRECO_BACKEND_URL + '/api/users',
    // headers: {
    //     'Authorization' : `Token ${token}`
    // }
})