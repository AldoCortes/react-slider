import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        position: 'absolute',
        top: '50%',
        height: '50px',
        width: '50px',
        justifyContent: 'center',
        background: 'white',
        borderRadius: '50%',
        cursor: 'pointer',
        alignItems: 'center',
        transition: 'transform ease-in 0.1s',
        '&:hover': {
          transform: 'scale(1.1)'
        }
    },
    arrow: {
        '&:focus': {
            outline: 0
        }
    }
  });

const Arrow = ({ direction, handleClick, disabled }) => {
    const classes = useStyles();
    
    return (
    <Button
        disabled={disabled}
        onClick={handleClick}
        className={classes.root}
        style={direction === 'right' ? {right: '15px'} : {left: '15px'}}
    >
        {direction === 'right' ? 
            <ChevronRightIcon 
                className={classes.arrow}
            ></ChevronRightIcon> 
            : <ChevronLeftIcon
                className={classes.arrow}
                style={{transform: `translateX(${direction === 'left' ? '-2' : '2'}px)`}}
            ></ChevronLeftIcon>}
    </Button>)
};

export default Arrow