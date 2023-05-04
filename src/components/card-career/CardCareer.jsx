import React from 'react';
import { apple, appleBlanca, ingenierias, ingenieriasBlanca, compu, compuBlanca, appleNegra, computerNegra, ingenieriasNegra } from '../../images';
import { useTheme } from 'styled-components';

const CardCareer = ({ career, filter, section, action, col = 0 }) => {
    const careerHandle = () => {
        action(filter);
    }
    const theme = useTheme();

    const imageApple = theme.status === 'dark' ? appleNegra : appleBlanca;
    const computerApple = theme.status === 'dark' ? computerNegra : compuBlanca;
    const ingenieriasApple = theme.status === 'dark' ? ingenieriasNegra : ingenieriasBlanca;
   

    return (
        <>
        
            <div className={`col-${ col }`}>
            <div  className={`card-career ${ section === filter ? 'card-selected' : '' }`} onClick={careerHandle}>
                
                <div className='container-career'>
                    {
                         section === 'basicas' ? <img style={{filter:`${ section === filter && theme.status === 'dark' ? 'invert(1)' : '' }` }} className="basicas" src={imageApple}></img> : ''
                    }
                    {
                        section === 'Divtic' ? <img style={{filter:`${ section === filter && theme.status === 'dark' ? 'invert(1)' : '' }` }}  className="basicas" src={computerApple}></img> : ''
                    }
                    {
                        section === 'ingenierias' ? <img style={{filter:`${ section === filter && theme.status === 'dark' ? 'invert(1)' : '' }` }} className="basicas" src={ingenieriasApple}></img> : ''
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