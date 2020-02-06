import { put, takeEvery } from 'redux-saga/effects'
import { 
  LOAD_IMAGES_ERROR, 
  LOAD_IMAGES_LOADING, 
  LOAD_IMAGES_SUCCESS} from "./actions";
import Api from '../api'

async function fetchAsync(func) {
 const response = await func();

 if (response.ok) {
 return await response.json();
 }

 throw new Error("Unexpected error!!!");
}

function* fetchImages() {
 try {
 const images = yield fetchAsync(Api.getImages);

 yield put({type: LOAD_IMAGES_SUCCESS, data: images});
 } catch (e) {
 yield put({type: LOAD_IMAGES_ERROR, error: e.message});
 }
}

export function* imagesSaga() {
  yield takeEvery(LOAD_IMAGES_LOADING, fetchImages);
}

export default imagesSaga;