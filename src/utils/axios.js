import axios from 'axios';
import { useEffect } from 'react';
const token = '8qlOkxz4wq'

/** base url to make request to the themoviedatabase */

// const instance = axios.create({
// 	baseURL: 'https://api.themoviedb.org/3'
// });


const instance = axios.create({
	baseURL: 'http://localhost:5000/movies',
	headers: { Authorization: `${token}` }
});

export default instance;
