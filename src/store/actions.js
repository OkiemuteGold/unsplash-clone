import axios from 'axios';

export const searchPhotos = async ({ commit, state }, query) => {

    // https://api.unsplash.com/photos?page=1
    // https://api.unsplash.com/search/photos?page=1&query=office
    // https://api.unsplash.com/search/photos?query=african&count=8

    let url = `${state.baseURL}/search/photos?query=${query}&client_id=${state.apiKey}`;

    let apiArgument = {
        orderBy: 'latest',
        count: 8,
    };

    await axios.get(url, apiArgument).then(response => {
        commit("SEARCHED_PHOTOS", response.data.results);
        console.log(response);

    }).catch(err => {
        console.log(err);
    });
}

export const fetchAllPhotosList = async ({ commit, state }) => {
    let url = `${state.baseURL}/photos?page=1&client_id=${state.apiKey}`

    let apiArgument = {
        orderBy: 'latest',
        perPage: 10,
    };

    await axios.get(url, apiArgument).then(response => {
        commit("ALL_PHOTOS_LIST", response.data);
        console.log(response);

    }).catch(err => {
        console.log(err);
    });
}

export const saveAllPhotosList = ({ commit }, data) => {
    commit("ALL_PHOTOS_LIST", data);
}