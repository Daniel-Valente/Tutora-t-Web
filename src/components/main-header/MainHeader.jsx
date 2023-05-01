import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useThemeContext } from '../../context/ThemeContext';
import { isLoginModal, isRegisterModal } from '../../helpers/utils';

const MainHeader = () => {
  const { value: loginModal } = useSelector(state => state.loginModal);
  const { value: registerModal } = useSelector(state => state.registerModal);
  const dispatch = useDispatch();
  const {contextTheme} = useThemeContext();

  return (
    <div className='header'>
      <a className='logo-link'>tutorate</a>

      <button className='button-without-background' onClick={() => isLoginModal(dispatch, loginModal)}>Iniciar sesion</button>
      <button className='button-shape' onClick={() => isRegisterModal(dispatch, registerModal)}>Registrate</button>
      <div className='linea' />
    </div>
  )
}

export default MainHeader;