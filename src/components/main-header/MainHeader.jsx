import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginModal, isRegisterModal } from '../../helpers/utils';
import { useTheme } from 'styled-components';
import { useState } from 'react';

const MainHeader = () => {
  const { value: loginModal } = useSelector(state => state.loginModal);
  const { value: registerModal } = useSelector(state => state.registerModal);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isHoverT, setIsHoverT] = useState(false);

   const handleMouseEnterT = () => {
      setIsHoverT(true);
   };
   const handleMouseLeaveT = () => {
      setIsHoverT(false);
   };
   const boxStyleT = {
    color: isHoverT ? theme.linkHover : theme.linkColor,
    textDecoration: 'none',
     transition: 'all 0.10s ease',
   };
   const [isHoverB, setIsHoverB] = useState(false);

   const handleMouseEnterB = () => {
      setIsHoverB(true);
   };
   const handleMouseLeaveB = () => {
      setIsHoverB(false);
   };
   const boxStyleB = {
    background: isHoverB ? theme.bH  : theme.linkColor,
    color:theme.header,
     transition: 'all 0.10s ease',
   };
  return (
    <div style={{background:theme.header}} className='header'>
      <a style={boxStyleT}  onMouseEnter={handleMouseEnterT}
            onMouseLeave={handleMouseLeaveT} className='logo-link'>tutorate</a>

      <button style={{background:theme.header}} className='button-without-background' onClick={() => isLoginModal(dispatch, loginModal)}>Iniciar sesion</button>
      <button style={boxStyleB} onMouseEnter={handleMouseEnterB}
            onMouseLeave={handleMouseLeaveB}  className='button-shape' onClick={() => isRegisterModal(dispatch, registerModal)}>Registrate</button>
      <div style={{ backgroundColor:theme.linea}} className='linea' />
    </div>
  )
}

export default MainHeader;