import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useVerifyEmailAddress } from '../hooks';
import { userInfo } from '../reducers';

const VerificationView = () => {
    const { verification } = useParams();
    
    const { mutate: verifyEmailAddress } = useVerifyEmailAddress();
    const userInfoPerfil = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if( userInfoPerfil && !userInfoPerfil.verify ) {
            const veryEmailUser = {
                uid_user: userInfoPerfil.uid_user,
                verification
            };

            verifyEmailAddress(veryEmailUser, {
                onSuccess: ({ data }) => {
                    console.log('logrado');
                    dispatch(userInfo(data));
                },
                onError: (response) => {
                    console.log(response);
                }
            });
        }
    }, [userInfoPerfil]);
    

  return (
    <>
        <div className='row'>
            <div className='col-2'/>
            <div className='col-7'>
                <span>
                    <h2>Email Verificado</h2>
                    <p>Su correo electronico ha sido verificado con exito</p>
                </span>
            </div>
            <div className='col-2'/>
        </div>
    </>
  )
}

export default VerificationView