import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageModal from './ImageModal'
const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
    },
    media: {
        height: 200,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();
    const { staticContext, imgUrl, title, ...rest } = props;

    const [openImageModal, setOpenImageModal] = React.useState(false);

    const handleOpenImageModal = () => {
        setOpenImageModal(true);
    };

    const handleCloseImageModal = () => {
        setOpenImageModal(false);
    };

    return (<>
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={imgUrl}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h5" noWrap>
                        {title === '' ? 'No title' : title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Click View Details to view in fullscreen
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleOpenImageModal}>
                    View Details
                </Button>
            </CardActions>
        </Card>
        <ImageModal
            title={title}
            imgUrl={imgUrl}
            open={openImageModal}
            handleClose={handleCloseImageModal} />
    </>);
}
