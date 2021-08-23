import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaCard from "./Card"
import { API_KEY, arrangePhotos, BASE_URL, GETIMAGES, SERACHIMAGES } from '../Utils'

export default function Home(props) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef()
    const lastElement = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNum(prevNum => prevNum + 1);
                setLoading(true);
            } else {

            }
        })
        if (node) observer.current.observe(node)
    }, [loading, pageNum]);


    useEffect(() => {
        setLoading(true);
        const getImages = `${BASE_URL}?method=${GETIMAGES}&api_key=${API_KEY}&page=${pageNum}&per_page=72&format=json&nojsoncallback=1`;
        const searchImages = `${BASE_URL}?method=${SERACHIMAGES}&api_key=${API_KEY}&text=${props.searchText}&page=${pageNum}&per_page=100&format=json&nojsoncallback=1`;
        let fetchURL;
        props.urlType === 'get-images' || props.refreshed > 0 ?
            fetchURL = getImages : fetchURL = searchImages;

        axios.get(fetchURL)
            .then((response) => {
                // console.log(response.data.photos)
                response.data.photos.page === response.data.photos.pages ? setHasMore(false) : setHasMore(true);
                setPhotos(arrangePhotos(photos, response.data.photos.photo));
                setLoading(false);
            }).catch((err) => {
                console.log(err.response);
            });

        // console.log(props.pageNo, props.searchText, props.urlType)
    }, [props.urlType, pageNum, props.searchText, props.refreshed]);

    return (
        <Grid container spacing={3}>
            {photos.map((ele, index) => {
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
            {loading === true || props.searching ? <div className="loader"><CircularProgress /> </div> : null}
        </Grid >
    )
}
