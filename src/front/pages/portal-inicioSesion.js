import React, {Component} from 'react'
import ReactDOM from 'react-dom'

const portalRoot = document.getElementById('portal-inicioSesion');

export default class PortalInicioSesion extends Component{
    constructor(){
        super();
        this.el = document.createElement('div');
    }
    componentDidMount = () =>{
        portalRoot.appendChild(this.el);
    }
    componentWillUnmount = () =>{
        portalRoot.removeChild(this.el);
    }
    render(){
        
       const {children} = this.props;
       return ReactDOM.createPortal(children, this.el);
        
    }
}
