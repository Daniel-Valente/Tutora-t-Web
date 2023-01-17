import React, {Component} from 'react'
import PortalPublicacion from './portal-publicacion';

export default class ModalPublicacion extends Component{
    render(){
        
       const {children, toggle, active} = this.props;
       console.log("ando aqui mara")
       return(
        <PortalPublicacion>
            {active &&  (
                <div style={styles.wrapper}>
                    <div style={styles.window}>
                        <button style={styles.closeBtn} onClick={toggle}>X</button>
                        <div> {children} </div>
                    </div>
                    <div onClick={toggle} style={styles.background} />
                </div>
            )
            }
        </PortalPublicacion>
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
        minWidth: '100%',
    },
    window: {
        position: 'relative',
        background: '#fff',
        borderRadius: 10,
        padding: 15, 
        boxShadow: '2px 2px 10px  rgba(0,0,0,0.3)',
        zIndex:10,
        top: '20vh',
        minWidth: 400,
        height: '45vh',
        
    },
    closeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        background: 'none',
        border: 'none',
    },
    background: {
        position: 'absolute',
        width: '100vw',
        height: '100%',
        top:0,
        left:0,
        },
};