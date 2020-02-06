import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  
    Select,
    MenuItem,
    FormControl,
    InputLabel } from '@material-ui/core';

const useStyles = makeStyles({
    formControl: {
        minWidth: 120,
    }
  });

const createSelectorItems = (fullsize) => {
    let menuitems = [];
    for(let i = 2; i < (fullsize < 5 ? fullsize : 5)+1; i++){
        menuitems.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return menuitems;
}

const VisibleItemsSelector = ({ current, fullsize, handleChange }) => {
    const classes = useStyles();

    if(fullsize < 2){
        return '';
    }
    
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="visual-items-amount-label">Visible items</InputLabel>
            <Select
                id="visual-items-amount"
                labelId="visual-items-amount-label"
                value={current}
                onChange={handleChange}
                >
                {createSelectorItems(fullsize)}
            </Select>
        </FormControl>
    );
};

export default VisibleItemsSelector;