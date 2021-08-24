import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


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

    const body = (
        <div className={classes.paper}>
            <img src={props.imgUrl} alt={props.title} className={classes.image} />
            <h4>{props.title}</h4>
        </div>
    );

    return (
        <div className="image-modal">
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
