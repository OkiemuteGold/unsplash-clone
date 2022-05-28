// const ACCESS_KEY = process.env.ACCESS_KEY;
import API_KEY from "../../key";

export default {
    baseURL: "https://api.unsplash.com",
    apiKey: API_KEY.key,
    searchedPhotos: [],
    closeModal: false,
    errorCode: null,
}