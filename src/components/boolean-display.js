import React from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function({ value }) {
    if(value){
        return (
            <FontAwesomeIcon icon={faCheck} color='#00b16a' />
        );
    }else{
        return (
            <FontAwesomeIcon icon={faTimes} color='#f64744' />
        );
    }
}