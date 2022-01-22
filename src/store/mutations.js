export const SEARCHED_PHOTOS = (state, data) => {
    state.searchedPhotos = data;
}

export const ALL_PHOTOS_LIST = (state, data) => {
    state.allPhotosList = data;
}

export const ERROR_CODE = (state, data) => {
    state.errorCode = data;
}

// SHOW PLAYING MUSIC
export const CLOSE_MODAL = (state) => {
    state.closeModal = true;
};