import React, { useEffect, useState, lazy, Suspense } from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from './components/Navbar';
import Home from './components/Home';
import { saveToLocalStorage } from './Utils';

function App(props) {
    // handling the search input state.
    const [searchedName, setSearchedName] = useState([{
        title: 'mountain',
        date: new Date().getTime()
    }]);
    const [currSearchedText, setCurrSearchedText] = useState('');
    const [urlType, setURLType] = useState('get-images');

    // while searching setting it to the loading type boolean.
    const [searching, setSearching] = useState(false);

    // for updating search paginations
    const [newItem, setNewItem] = useState(true);

    // Handle the main components search bar for two-way data binding.
    const handleSearch = (e, val) => {
        e.preventDefault();
        console.log(val)
        setSearching(true);
        console.log(val.length === 0);
        if (val.length >= 3) {
            setCurrSearchedText(val);
            saveToLocalStorage(val);
            const getlsSearchedItems = JSON.parse(localStorage.getItem('searchedNameList'));
            setSearchedName(getlsSearchedItems);
            setURLType('search-images');
            setSearching(false);
            setNewItem(true);
        } else if (val.length === 0) {
            setNewItem(true);
            setURLType('get-images');
            setCurrSearchedText('');
        }
    };

    // changing state on the and storing the search queries.
    useEffect(() => {
        const getlsSearchedItems = JSON.parse(localStorage.getItem('searchedNameList'));
        if (getlsSearchedItems === null || getlsSearchedItems === undefined) {

        } else {
            setSearchedName(getlsSearchedItems);
        }
    }, []);

    // changing the functions as per the state of the.
    const handleNewItem = bool => setNewItem(bool)

    return (
        <>
            <header>
                <AppBar
                    searchedTags={searchedName}
                    search={handleSearch} />
            </header>
            <br />
            <Container maxWidth="lg">
                <Suspense fallback={<div className="loader"><CircularProgress /></div>}>
                    <Home
                        searchedNewItem={newItem}
                        searchText={currSearchedText}
                        urlType={urlType}
                        searching={searching}
                        handleNewItem={handleNewItem}
                    />
                </Suspense>

            </Container>
        </>
    );
}

export default App;
