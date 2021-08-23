import axios from 'axios';
import { useEffect, useState, lazy, Suspense } from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from './components/Navbar';
import { API_KEY, arrangePhotos, BASE_URL, saveToLocalStorage } from './Utils';

const Home = lazy(() => import("./components/Home"));

function App(props) {
    const [searchedName, setSearchedName] = useState([{
        title: 'mountain',
        date: new Date().getTime()
    }]);
    const [currSearchedText, setCurrSearchedText] = useState('');
    const [refreshed, setRefreshed] = useState(0)
    const [urlType, setURLType] = useState('get-images')
    const [searching, setSearching] = useState(false);

    const handleSearch = (val) => {
        setSearching(true);
        if (val.length >= 3) {
            setCurrSearchedText(val);
            saveToLocalStorage(val);
            const getlsSearchedItems = JSON.parse(localStorage.getItem('searchedNameList'));
            setSearchedName(getlsSearchedItems);
            setURLType('search-images');
            setSearching(false);
        } else if (val.length === 0) {
            setURLType('get-images');
            setCurrSearchedText('');
            setRefreshed(prevState => prevState + 1);
        }
    }
    useEffect(() => {
        const getlsSearchedItems = JSON.parse(localStorage.getItem('searchedNameList'));
        if (getlsSearchedItems === null || getlsSearchedItems === undefined) {

        } else {
            setSearchedName(getlsSearchedItems);
        }
    }, [])
    return (
        <>
            <header>
                <AppBar
                    searchedTags={searchedName}
                    search={handleSearch} />
            </header>
            <br />
            <Container maxWidth="lg">
                <Suspense fallback={<div className="loader"><CircularProgress /> </div>}>
                    <Home
                        refreshed={refreshed}
                        searchText={currSearchedText}
                        urlType={urlType}
                        searching={searching}
                    />
                </Suspense>

            </Container>
        </>
    );
}

export default App;