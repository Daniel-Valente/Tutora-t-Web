import React, {Component} from 'react'
import PortalNotificaciones from './portal-notificaciones';

export default class Notificaciones extends Component{
    render(){
        
       const {children, toggle, active} = this.props;
       return(
        <PortalNotificaciones>
            {active &&  (
                <div style={styles.wrapper}>
                    <div style={styles.window}>
                        
                        <div> {children} </div>
                    </div>
                    <div onClick={toggle} style={styles.background} />
                </div>
            )
            }
        </PortalNotificaciones>
       )   
        
    }
}

const styles = {
    wrapper: {
        position: 'absolute',
        top: 70,
        right: 0,
        width: '100vw',
        height: '92%',
       
    },
    window: {
        position: 'relative',
        background: '#fff',
        float: 'right',
        borderRadius: 10,
        width: '20vw',
        boxShadow: '2px 2px 10px  rgba(0,0,0,0.3)',
        zIndex:10,
        top: 0,
        marginRight:'1vw',
        
    },
    background: {
        position: 'absolute',
        width: '100vw',
        height: '100%',
        top:0,
        left:0,
        }
};