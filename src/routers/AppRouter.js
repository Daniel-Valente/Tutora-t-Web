import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

const ChatsView = lazy(() => import('../views/ChatsView'));
const ChatPanel = lazy(() => import('../components/chats/Chat'));
const HomeView = lazy(() => import('../views/HomeView'));
const CourseView = lazy(() => import('../views/CourseView'));
const MainView = lazy(() => import('../views/MainView'));
const PerfilView = lazy(() => import('../views/PerfilView'));
const SettingsView = lazy(() => import('../views/SettingsView'));
const PostPanel = lazy(() => import('../components/post-panel/PostPanel'));
const EditPostPanel = lazy(() => import('../components/edit-post-panel/EditPostPanel'));

const AppRouter = () => {
  const { active: sessionActive } = useSelector(state => state.sessionActive);
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div>
      {
        sessionActive ? (
          <>
            <Routes location={background || location}>
              <Route path='/' element={<HomeView />} />
              <Route path='/:id_Post' element={<PostPanel />} />
              {/* HOME */}
              <Route path='/home' element={<HomeView />} />
              <Route path='/home/:id_Post' element={<PostPanel />} />
              <Route path='/home/edit/:id_Post' element={<EditPostPanel />} />
              {/* Courses */}
              <Route path='/course/:id_Course' element={<CourseView />} />
              <Route path='/course/:id_Course/:id_Post' element={<PostPanel />} />
              <Route path='/course/:id_Course/edit/:id_Post' element={<EditPostPanel />} />
              {/* USER */}
              <Route path='/perfil/:uid_user' element={<PerfilView />} />
              <Route path='/perfil/:uid_user/:id_Post' element={<PostPanel />} />
              <Route path='/perfil/:uid_user/edit/:id_Post' element={<EditPostPanel />} />
              <Route path='/configuracion/:uid_user' element={<SettingsView />} />
              {/* CHAT */}
              <Route path='/chats/:uid_user' element={<ChatsView />} />
              <Route path='/chats/:uid_user/to/:uid_userChat' element={<ChatPanel />} />
            </Routes>
            {
              background && (
                <Routes>
                  <Route path='/chats/:uid_user/to/:uid_userChat' element={<ChatPanel />} />
                </Routes>
              )
            }
          </>
        )
          : <>
            <Routes>
              <Route path='/' element={<MainView />} />
              <Route path='/:uid_user' element={<MainView />} />
              <Route path='/:id_Post' element={<MainView />} />
              {/* HOME */}
              <Route path='/home' element={<MainView />} />
              <Route path='/home/:uid_user' element={<MainView />} />
              <Route path='/home/:id_Post' element={<MainView />} />
              <Route path='/home/:uid_user/edit/:id_Post' element={<MainView />} />
              {/* USER */}
              <Route path='/perfil/:uid_user' element={<MainView />} />
              <Route path='/perfil/:uid_user/:id_Post' element={<MainView />} />
              <Route path='/perfil/:uid_user/edit/:id_Post' element={<MainView />} />
              <Route path='/configuracion/:uid_user' element={<MainView />} />
              {/* CHAT */}
              <Route path='/chats/:uid_user' element={<MainView />} />
              <Route path='/chats/:uid_user/to/:uid_userChat' element={<MainView />} />
            </Routes>
          </>
      }
    </div>
  )
}

export default AppRouter;