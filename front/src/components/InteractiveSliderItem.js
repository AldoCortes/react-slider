import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography, 
    Button, 
    Grid} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        transition: 'transform ease-out 0.45s',
        height: '100%',
        width: '100%',
        display: 'flex',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    fullBlock: {
        width: '100%',
        height: '100%',
        display: 'block',
        position: 'relative',
        overflow: 'hidden'
    },
    caption: {
        position: 'absolute',
        bottom: '0',
        width: '100%',
        display: 'block',
        height: 'auto',
        padding: '3px 5px',
        color: 'white',
        backgroundColor: 'rgba(20, 20, 20, 0.5)',
        textAlign: 'center'
    },
    viewMode: {
        opacity: 0,
        '-webkit-transition': 'opacity 1s ease-in',
        '-moz-transition': 'opacity 1s ease-in',
        '-o-transition': 'opacity 1s ease-in',
        '-ms-transition': 'opacity 1s ease-in',
        transition: 'opacity 1s ease-in',
        '&:hover': {
            opacity: 1
        }
    },
    editorMode: {
        opacity: 0,
        cursor: 'pointer'
    },
    image: {
        height: 'auto'
    }
});

export default function InteractiveSliderItem(props) {
  const classes = useStyles();
  const {item, widthRatio, clickHandler, editorMode} = {...props};
  const [active, setActive] = useState(false);
  const handleClick = () => {
    clickHandler(item);
  };
  return (
    <div 
        className={classes.root} 
        style={{
            backgroundImage: `url('public/images/${item.imageName}')`,
        }}>
        <div
            onClick={handleClick}
            style={{ width: `${ widthRatio}px`, height: `${ widthRatio}px` }}
            className={`${classes.fullBlock} ${ editorMode ? classes.editorMode : classes.viewMode }`}
            >
                <div className={classes.caption}>
                    {item.imageCaption}
                </div>
            </div>
    </div>
  );
}
