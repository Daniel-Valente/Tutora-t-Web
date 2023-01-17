import React, {Component} from 'react'
import ReactDOM from 'react-dom'

const portalRoot = document.getElementById('portal-post');

export default class PortalPost extends Component{
    constructor(){
        super();
        this.el = document.createElement('div');
    }
    componentDidMount = () =>{
        portalRoot.appendChild(this.el);
    }
 
    render(){
        
        const {children} = this.props;
        return ReactDOM.createPortal(children, this.el);
         
     }
}