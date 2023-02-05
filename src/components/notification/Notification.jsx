import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    const handleClose = ( event, reason ) => {
        if( reason === 'clickaway' ) return;
       
        dispatch( viewAlert({
            ...alert,
            isOpen: false
        }))
    }

    return (
    <Snackbar
        open={ alert.isOpen }
        autoHideDuration={ 3000 }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={ handleClose }
    >
        <Alert severity={ alert.type } onClose={ handleClose }>
            { alert.message }
        </Alert>
    </Snackbar>
  )
}

export default Notification;