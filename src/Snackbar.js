import React, { useState, useEffect } from 'react';

const Snackbar = ({ message, setMessage }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message !== '') {
            setShow(true);
            setTimeout(() => {
                setShow(false);
                setMessage('');  // Reset message after showing Snackbar
            }, 3000);  // Snackbar will be visible for 3 seconds
        }
    }, [message, setMessage]);

    return (
        <div className={show ? "snackbar show" : "snackbar"}>{message}</div>
    );
};

export default Snackbar;
