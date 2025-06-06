import axios from "axios";

export const LunchPunch = axios.create({
    baseURL: 'http://localhost:5267/api/ITOps/LunchPunch'
});

export default {  LunchPunch };