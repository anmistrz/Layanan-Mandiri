import { baseApi as baseURL } from "./Config";
import baseAPI from "../utils/axiosConfig";


const Delete = async (path, data) => {
    try {
        const res = await baseAPI.baseAPI.delete(`${baseURL}${path}`);
        return res;

    } catch (err) {
        console.log("error req delete: ", err.res.data);
        throw err;
    }
}

export default Delete;