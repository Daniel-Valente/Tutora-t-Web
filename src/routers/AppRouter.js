import React from 'react';
import { useSelector } from 'react-redux';
import {
    Navigate,
    Route,
    Routes
} from 'react-router-dom';

import ChatsView from '../views/ChatsView';
import HomeView from '../views/HomeView';
import MainView from '../views/MainView';
import PerfilView from '../views/PerfilView';
import SettingsView from '../views/SettingsView';

const AppRouter = () => {
  const { active: sessionActive } = useSelector(state => state.sessionActive);

  return (
    <Routes>
        {
          sessionActive ? 
          (
            <>
              <Route path='/' element={ <HomeView/> } />
              <Route path='/home' element={ <HomeView/> } />
              <Route path='/perfil/:uid_user' element={ <PerfilView/> } />
              <Route path='/configuracion/:uid_user' element={ <SettingsView/> }/>
              <Route path='/chats/:uid_user' element={ <ChatsView/> } />
            </>
          ) :
          (
            <>
              <Route path='/' element={ <MainView/> } />
              <Route path='/home' element={ <MainView/> } />
              <Route path='/perfil/:uid_user' element={ <MainView/> } />
              <Route path='/configuracion/:uid_user' element={ <MainView/> }/>
              <Route path='/chats/:uid_user' element={ <MainView/> } />
            </>
          )
        }
    </Routes>
  )
}

export default AppRouter;