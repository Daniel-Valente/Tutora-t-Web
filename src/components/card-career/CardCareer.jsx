import React from 'react';

const CardCareer = ({ career, filter, section, action, col = 0 }) => {
    const careerHandle = () => {
        action(filter);
    }

    return (
        <>
            <div className={`col-${ col }`}>
            <div className={`card-career ${ section === filter ? 'card-selected' : '' }`} onClick={careerHandle}>
                <div className='container-career'>
                {
                    filter
                }
                </div>
            </div>
            </div>
        </>
    )
}

export default CardCareer;