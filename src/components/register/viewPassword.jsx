import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { useRef } from 'react';
import { useEffect } from 'react';
import animation from './eye.json';
const ViewPassword = () => {

    const lottieRef = useRef();
    const [isActive, setIsActive] = useState(false);
    const [ viewPassword, setViewPassword] = useState(false);
    const [noViewPassord, setNoViewPassord] = useState(false);

    useEffect( () => {
        lottieRef.current.setSpeed(2.5);
        lottieRef.current.goToAndStop(17, true);

        if(viewPassword){
            lottieRef.current.playSegments([18,55],true);
        }
        if(noViewPassord){
            lottieRef.current.playSegments([55,18],true);
        }

    },[viewPassword, noViewPassord]);

    const changeView = () => {
        if(!isActive){
            setViewPassword(true);
            setIsActive(true);
            setNoViewPassord(false);
        }else{
            setViewPassword(false);
            setIsActive(false);
            setNoViewPassord(true);
        }
    }

    return (
        <div>
             <Lottie lottieRef={lottieRef} animationData={animation} loop={false} onClick={changeView} />
        </div>
    );
};

export default ViewPassword;