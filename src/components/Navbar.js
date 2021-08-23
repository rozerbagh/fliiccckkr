import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: '100%',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'relative',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '600px',
        },
    },
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState('');;
    const handleInput = (e) => {
        setSearchInput(e.target.value);
    }

    const [searchedName, setSearchedName] = useState([]);

    useEffect(() => {
        const searcheArr = [];
        props.searchedTags.map(ele => {
            searcheArr.push({
                title: ele.title,
                date: ele.date
            })
        })
        setSearchedName(searcheArr)
    }, [props.searchedTags])

    return (
        <div className={classes.grow}>
            <AppBar position="sticky" color="inherit">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        RanDomClick
                    </Typography>
                    <div className={classes.search}>
                        <Autocomplete
                            id="combo-box-demo"
                            inputValue={searchInput}
                            options={searchedName}
                            fullWidth
                            getOptionSelected={(option, value) => {
                                if (option.title === value.title) {
                                    setSearchInput(option.title)
                                }
                                return option.title === value.title
                            }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) =>
                                <TextField {...params}
                                    fullWidth
                                    size="small"
                                    value={searchInput}
                                    onChange={handleInput}
                                    label="Search"
                                    variant="outlined"
                                    placeholder="Type 3 char to search..." />}
                        />
                    </div>
                    <Button
                        onClick={() => props.search(searchInput)}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        size="medium"
                    >
                        <SearchIcon />
                    </Button>
                    <IconButton
                        onClick={() => props.search('')}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        size="medium"
                    >
                        <RefreshIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

