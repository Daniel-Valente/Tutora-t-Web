import React, {Component} from 'react'
import PortalRegistro from './portal-registro';

export default class ModalRegistro extends Component{
    render(){
        
       const {children, toggle, active} = this.props;
       return(
        <PortalRegistro>
            {active &&  (
                <div style={styles.wrapper}>
                    <div style={styles.window}>
                        <button style={styles.closeBtn} onClick={toggle}>X</button>
                        <div> {children} </div>
                    </div>

                </div>
            )
            }
        </PortalRegistro>
       )   
        
    }
}

const styles = {
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        minWidth: '100vw',
    },
    window: {
        position: 'relative',
        background: '#fff',
        borderRadius: 10,
        padding: 15, 
        boxShadow: '2px 2px 10px  rgba(0,0,0,0.3)',
        zIndex:10,
        top: 90,
        minWidth: 400,
        height: '55vh',
        
    },
    closeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        background: 'none',
        border: 'none',
    }
};