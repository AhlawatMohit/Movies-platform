import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3';

const TMBD_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjc2NWVmYjQ5OTY1NzlhMWIwMzcxYjEwZWRkZTE2ZiIsInN1YiI6IjY1MGMyMzFkM2Q3NDU0MDBjNGExNjgxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pq_SbrbLXsGZ0eCJ1Wv9hwHOfd2sX1IbNz-QnRkT3Mg";

const headers = {
    Authorization : "bearer " + TMBD_TOKEN,
};

export const fetchApiData = async (url, params) => {
    try {
        
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;

    } catch (error) {
        console.log(error);
        return error;
    }

}