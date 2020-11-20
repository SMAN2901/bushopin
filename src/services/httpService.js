import axios from "axios";

var httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    patch: axios.patch,
    delete: axios.delete,
};

export default httpService;
