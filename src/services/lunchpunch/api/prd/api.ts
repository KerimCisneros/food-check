import axios from "axios";

export const LunchPunch = axios.create({
    baseURL: 'http://172.16.5.237:8107/api/ITOps/LunchPunch'
});
