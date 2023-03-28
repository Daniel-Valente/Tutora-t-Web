import React from 'react';
import { apple, appleBlanca, ingenierias, ingenieriasBlanca, compu, compuBlanca } from '../../images';

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
                        section === 'basicas' ? <img className="basicas" src={appleBlanca}></img> : ''
                    }
                    {
                        section === 'Divtic' ? <img className="basicas" src={compuBlanca}></img> : ''
                    }
                    {
                        section === 'ingenierias' ? <img className="basicas" src={ingenieriasBlanca}></img> : ''
                    }
                    {
                        filter === 'basicas' ? <img className="basicas" src={apple}></img> : ''
                    }
                    {
                        filter === 'ingenierias' ? <img className="basicas" src={ingenierias}></img> : ''
                    }
                    {
                        filter === 'Divtic' ? <img className="basicas" src={compu}></img> : ''
                    }
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