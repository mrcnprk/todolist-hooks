import React from 'react';

const Prompt = (props) => {


    return (
        <>
            {props.handleConfirm ? (<i className='fas fa-check' onClick={props.handleConfirm}></i>) : null}<span>{props.message}</span>{props.handleDecline ? (<i className='fas fa-times' onClick={props.handleDecline}></i>) : null }
        </>
     );
}

export default Prompt;