import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaCard from "./Card"
import { API_KEY, arrangePhotos, BASE_URL, GETIMAGES, SERACHIMAGES } from '../Utils'

export default function Home(props) {
    // state for the photos array
    const [photos, setPhotos] = useState([]);

    // state for the fetching loading.
    const [loading, setLoading] = useState(true);

    // state for the page number.
    const [pageNum, setPageNum] = useState(1);

    const [hasMore, setHasMore] = useState(true);


    // for infinite scrolling functionality.
    const observer = useRef()
    const lastElement = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNum(prevNum => prevNum + 1);
                setLoading(true);
                props.handleNewItem(false);
            } else {

            }
        })
        if (node) observer.current.observe(node)
    }, [loading, pageNum, hasMore]);
    // for infinite scrolling functionality.

    // calling the API for searching and fetching the images
    const fetchImages = (urlType, searchText, pageNum, newItem) => {
        const getImages = `${BASE_URL}?method=${GETIMAGES}&api_key=${API_KEY}&page=${pageNum}&per_page=72&format=json&nojsoncallback=1`;
        const searchImages = `${BASE_URL}?method=${SERACHIMAGES}&api_key=${API_KEY}&text=${searchText}&page=${pageNum}&per_page=100&format=json&nojsoncallback=1`;
        let fetchURL = urlType === 'search-images' ? searchImages : getImages;
        console.log(urlType, newItem, pageNum);
        axios.get(fetchURL)
            .then((response) => {
                // console.log(response.data.photos)
                response.data.photos.page === response.data.photos.pages ? setHasMore(false) : setHasMore(true);
                if (urlType === 'search-images') {
                    newItem ? setPhotos(arrangePhotos([], response.data.photos.photo)) :
                        setPhotos(arrangePhotos(photos, response.data.photos.photo));

                } else {
                    newItem ? setPhotos(arrangePhotos([], response.data.photos.photo)) :
                        setPhotos(arrangePhotos(photos, response.data.photos.photo));
                }
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err, urlType, searchText);
            });
        setPageNum(pageNum);
    }

    // updating the state as per the global App state
    useEffect(() => {
        setLoading(true);
        console.log('runn');
        fetchImages(props.urlType, props.searchText, props.searchedNewItem ? 1 : pageNum, props.searchedNewItem)
        // console.log(props.pageNo, props.searchText, props.urlType)
    }, [props.urlType, pageNum, props.searchText, props.searchedNewItem]);

    return (
        <Grid container spacing={3}>
            {props.searchedNewItem && loading === true ? <div className="loader"><CircularProgress /> </div> : photos.map((ele, index) => {
                if (photos.length === index + 1) {
                    return <Grid ref={lastElement}
                        item xs={12} sm={6} md={4} lg={2} xl={2} key={`media-card-${index}`}>
                        <MediaCard
                            title={ele.title}
                            imgUrl={`https://live.staticflickr.com/${ele.server}/${ele.id}_${ele.secret}.jpg`}
                        />
                    </Grid>
                } else {
                    return <Grid
                        item xs={12} sm={6} md={4} lg={2} xl={2} key={`media-card-${index}`}>
                        <MediaCard
                            title={ele.title}
                            imgUrl={`https://live.staticflickr.com/${ele.server}/${ele.id}_${ele.secret}.jpg`}
                        />
                    </Grid>
                }
            }
            )}
            {pageNum > 1 && (loading === true || props.searching) ? <div className="loader"><CircularProgress /> </div> : null}
        </Grid >
    )
}
