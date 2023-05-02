import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

const ChatsView = lazy(() => import('../views/ChatsView'));
const ChatPanel = lazy(() => import('../components/chats/Chat'));
const ChatView = lazy(() => import('../views/ChatView'));
const HomeView = lazy(() => import('../views/HomeView'));
const CoursesView = lazy(() => import('../views/CoursesView'));
const CourseView = lazy(() => import('../views/CourseView'));
const MainView = lazy(() => import('../views/MainView'));
const PerfilView = lazy(() => import('../views/PerfilView'));
const SettingsView = lazy(() => import('../views/SettingsView'));
const PostPanel = lazy(() => import('../components/post-panel/PostPanel'));
const EditPostPanel = lazy(() => import('../components/edit-post-panel/EditPostPanel'));
const VerificationView = lazy(() => import('../views/VerificationView'));

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
              <Route path='/:uid_user/to/:uid_userChat' element={<ChatView />} />
              {/* HOME */}
              <Route path='/home' element={<HomeView />} />
              <Route path='/home/:id_Post' element={<PostPanel />} />
              <Route path='/home/edit/:id_Post' element={<EditPostPanel />} />
              <Route path='/home/:uid_user/to/:uid_userChat' element={<ChatView />} />
              {/* Courses */}
              <Route path='/courses' element={<CoursesView />} />
              <Route path='/course/:id_Course' element={<CourseView />} />
              <Route path='/course/:id_Course/:id_Post' element={<PostPanel />} />
              <Route path='/courses/:uid_user/to/:uid_userChat' element={<ChatView />} />
              <Route path='/course/:id_Course/edit/:id_Post' element={<EditPostPanel />} />
              <Route path='/course/:id_Course/:uid_user/to/:uid_userChat' element={<ChatView />} />
              {/* USER */}
              <Route path='/perfil/:uid_user' element={<PerfilView />} />
              <Route path='/perfil/:uid_user/:id_Post' element={<PostPanel />} />
              <Route path='/perfil/:uid_user/edit/:id_Post' element={<EditPostPanel />} />
              <Route path='/perfil/:uid_user/to/:uid_userChat' element={<ChatView />} />
              {/* Settings  */}
              <Route path='/configuracion/:uid_user' element={<SettingsView />} />
              <Route path='/configuracion/:uid_user/to/:uid_userChat' element={<ChatView />} />
              {/* CHAT */}
              <Route path='/chats/:uid_user' element={<ChatsView />} />
              <Route path='/chats/:uid_user/to/:uid_userChat' element={<ChatPanel />} />
              {/* Verification */}
              <Route path='/verification/:verification' element={<VerificationView />} />
              
            </Routes>
            {
              background && (
                <Routes>
                  <Route path='/:uid_user/to/:uid_userChat' element={<ChatView />} />
                  {/*Home*/}
                  <Route path='/home/:id_Post' element={<PostPanel />} />
                  <Route path='/home/:uid_user/to/:uid_userChat' element={<ChatView />} />
                  <Route path='/home/edit/:id_Post' element={<EditPostPanel />} />
                  {/*Chats*/}
                  <Route path='/chats/:uid_user/to/:uid_userChat' element={<ChatPanel />} />
                  {/*Perfil*/}
                  <Route path='/perfil/:uid_user/:id_Post' element={<PostPanel />} />
                  <Route path='/perfil/:uid_user/edit/:id_Post' element={<EditPostPanel />} />
                  <Route path='/perfil/:uid_user/to/:uid_userChat' element={<ChatView />} />
                  {/*Settings*/}
                  <Route path='/configuracion/:uid_user/to/:uid_userChat' element={<ChatView />} />
                  {/*Course*/}
                  <Route path='/course/:id_Course/:id_Post' element={<PostPanel />} />
                  <Route path='/course/:id_Course/edit/:id_Post' element={<EditPostPanel />} />
                  <Route path='/course/:id_Course/:uid_user/to/:uid_userChat' element={<ChatView />} />
                  <Route path='/courses/:uid_user/to/:uid_userChat' element={<ChatView />} />
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
              {/* Verification */}
              <Route path='/verification/:verification' element={<MainView />} />
            </Routes>
          </>
      }
    </div>
  )
}

export default AppRouter;