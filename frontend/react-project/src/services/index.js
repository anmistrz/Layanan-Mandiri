import Post from "./Post";
import Get from "./Get";
import Put from "./Put";
import Delete from "./Delete";
import { id } from "date-fns/locale";


// Post
const login = (data) => Post("/login/index", data ?? {});
const loginUser = (data) => Post("/login", data ?? {});
const logout = (data) => Post("/login/logout", data ?? {});
const addIssues = (data) => Post("/issues/add", data ?? {});
const addStatisticRenew = (data) => Post("/renew/statistics", data ?? {});
const addSuggest = (data) => Post("/suggest", data ?? {});



// Get
const getIssues = () => Get("/issues");
const getListCheckoutIssues = (id) => Get(`/issues/${id}`);
const getDetailRenew = (id) => Get(`/renew/${id}`);
const getMySuggest = () => Get("/suggest/list");
const getDetailSuggest = (id) => Get(`/suggest/list/${id}`);
const getPhotoProfile = () => Get("/login/user/image");
const getDataUser = () => Get("/login/user/list");



//Put
const updateIssues = (data) => Put("/issues/update", data ?? {});
const updateRenew = (data) => Put("/renew/update", data ?? {});
const updateSuggest = (data) => Put("/suggest/update", data ?? {});
const updateProfile = (data) => Put("/login/user/update", data ?? {});

//Delete
const deleteSuggest = (id) => Delete(`/suggest/delete/${id}`);


const API = {
    login,
    loginUser,
    logout,
    getIssues,
    getListCheckoutIssues,
    addIssues,
    updateIssues,
    getDetailRenew,
    updateRenew,
    addStatisticRenew,
    getMySuggest,
    addSuggest,
    updateSuggest,
    deleteSuggest,
    getDetailSuggest,
    getPhotoProfile,
    updateProfile,
    getDataUser,

}

export default API;