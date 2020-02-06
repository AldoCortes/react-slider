import {
    LOAD_IMAGES_ERROR, 
    LOAD_IMAGES_LOADING, 
    LOAD_IMAGES_SUCCESS,
    SET_CAROUSEL_IMAGES,
    SET_VIEWER_IMAGE } from "./actions";
  
const initialState = {  
   data: [],  
   loading: false,  
   error: '',
   images: [],
   viewer: null
};  
  
export default function reduxSagaReducer(state = initialState, action) {  
   switch (action.type) {  
       case LOAD_IMAGES_LOADING: {  
           return {  
               ...state,  
               loading: true,  
               error:''  
           };  
       }  
       case LOAD_IMAGES_SUCCESS: {  
           return {  
               ...state,  
               data: action.data,  
               loading: false  
           }  
       }  
       case LOAD_IMAGES_ERROR: {  
           return {  
               ...state,  
               loading: false,  
               error: action.error  
           };  
       }
       case SET_CAROUSEL_IMAGES: {
            return {
                ...state,
                images: action.images
            }
       }
       case SET_VIEWER_IMAGE: {
            return {
                ...state,
                viewer: action.item
            }
       }
       default: {  
           return state;  
       }  
   }  
}