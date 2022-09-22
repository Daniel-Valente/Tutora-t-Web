import React, {Component} from 'react'
import PortalComments from './portal-comments';

export default class Comments extends Component{
    render(){
        
        const {children, toggle, active} = this.props;
        return(
            <PortalComments>
            {active &&  (
                <div style={styles.wrapper}>
                    <div style={styles.window}>
                        <button style={styles.closeBtn} onClick={toggle}>X</button>
                        <div> {children} </div>
                    </div>

                </div>
            )
            }
        </PortalComments>
        )
         
     }
}

const styles = {
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        hight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
    },
    window: {
        position: 'relative',
        background: '#fff',
        borderRadius: 10,
        paddingBottom:15, 
        boxShadow: '2px 2px 10px  rgba(0,0,0,0.3)',
        zIndex:10,
        top: 40,
        minWidth: 900,
        
    },
    closeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        background: 'none',
        border: 'none',
    }
};