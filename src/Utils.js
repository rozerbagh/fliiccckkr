export const API_KEY = '7874ef83a9fca32bdf4b45a006ad55d9';
export const BASE_URL = 'https://api.flickr.com/services/rest/';
export const GETIMAGES = 'flickr.photos.getRecent';
export const SERACHIMAGES = 'flickr.photos.search';

export const arrangePhotos = (oldPhotosArr, photosArr) => {
    const photosArray = [];
    if (oldPhotosArr.length > 0) {
        oldPhotosArr.map(ele => {
            return photosArray.push(ele);
        })
    }
    photosArr.map(ele => {
        return photosArray.push(ele)
    });

    return photosArray;
}

export const saveToLocalStorage = (input) => {
    const searchedItems = [];
    const getlsSearchedItems = JSON.parse(localStorage.getItem('searchedNameList'));
    if (getlsSearchedItems === null || getlsSearchedItems === undefined) {
        searchedItems.push({ title: input, date: new Date().getTime() });
        localStorage.setItem('searchedNameList', JSON.stringify(searchedItems));
    } else {
        const found = getlsSearchedItems.find(element => element.title === input ? true : false);
        if (found) {

        } else {
            getlsSearchedItems.push({ title: input, date: new Date().getTime() });
            localStorage.setItem('searchedNameList', JSON.stringify(getlsSearchedItems));
        }
    }
}