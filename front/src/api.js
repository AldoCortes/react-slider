const API_BASE_ADDRESS = 'http://localhost:4000';

export default class Api {
    static getImages() {
        const uri = API_BASE_ADDRESS + "/carouselImages";

        return fetch(uri, {
            method: 'GET'
        });
    }
}