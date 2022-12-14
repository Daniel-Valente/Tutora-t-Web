import React, {Component} from 'react'
import ReactDOM from 'react-dom'

const portalRoot = document.getElementById('portal-comments');

export default class PortalComments extends Component{
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