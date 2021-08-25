import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        margin: "0 auto",
        marginTop: "50px",
        width: "40%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #ffffff',
        boxShadow: theme.shadows[5],
        padding: "20px",
    },
    image: {
        width: "100%",
        position: 'relative',
    }
}));

export default function SimpleModal(props) {
    const classes = useStyles();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Descriptions
                </DialogContentText>
                <img src={props.imgUrl} alt={props.title} className={classes.image} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleClose} color="primary">
                    close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
