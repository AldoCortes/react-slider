export const LOAD_IMAGES_LOADING = 'REDUX_SAGA_LOAD_IMAGES_LOADING';
export const LOAD_IMAGES_SUCCESS = 'REDUX_SAGA_LOAD_IMAGES_SUCCESS';
export const LOAD_IMAGES_ERROR = 'REDUX_SAGA_LOAD_IMAGES_ERROR';
export const SET_CAROUSEL_IMAGES = 'REDUX_SAGA_SET_CAROUSEL_IMAGES';
export const SET_VIEWER_IMAGE = 'REDUX_SAGA_SET_VIEWER_IMAGE';

export const loadImages = () => dispatch => {
   dispatch({ type: LOAD_IMAGES_LOADING });
};

export const setCarouselImages = (f) => dispatch => {
   dispatch({ type: SET_CAROUSEL_IMAGES, images: f });
};
export const setViewer = (item) => dispatch => {
   dispatch({ type: SET_VIEWER_IMAGE, item: item });
};