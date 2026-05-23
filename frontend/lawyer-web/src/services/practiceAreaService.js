import axios from './axios';

const getAll = () => axios.get('/practice-areas').then(res => res.data.data);
const getById = (id) => axios.get(`/practice-areas/${id}`).then(res => res.data.data);

export default { getAll, getById };