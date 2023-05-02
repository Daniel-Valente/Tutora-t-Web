import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import HomeHeader from './components/home-header/HomeHeader';
import MainHeader from './components/main-header/MainHeader';
import styled, { ThemeProvider } from "styled-components";
import AppRouter from './routers/AppRouter';
import SunIcon from './components/switch/sun';
import MoonIcon from './components/switch/moon';
import Switch from './components/switch/switch';
const StyledApp = styled.div`
background: ${(props) => props.theme.background};
transition: all 0.25s ease;
`;
const darkTheme ={
  header: '#343438',
  icon: '#b6b6b6',
  subTitles: '#b8b6b6',
  background:'#2a2a2b',
  linea:'#525252',
  boxShadow:'2px 2px 10px rgba(18, 17, 17, 0.3)',
  colorPuntos:'#b8b6b6',
  userName:'#fff',
  userName2:'#b8b6b6',
  comments:'#4d4d52',
  commentsHover:'#797b7d',
  numbers:'#b8b6b6',
  globo: 'brightness(500%)',
  commentPost:'1px solid #dedede',
  botonCircularHover:'#797b7d',
  botonCircular: '#242426',
  iconsCircular:'invert(0.8)',
  iconCircularNormal:'invert(0.8)',
  linkColor:'#2bc6ff',
  linkHover:'#ff0096',
  bH:'#2a81bb',
  eye:'invert(1)',
  hover: 'opacity(.6)',
  status: 'dark',
  selected:'#2a2a2b'
  

};
const lightTheme ={
  header: '#fff',
  icon:'#1c1c1c',
  subTitles: '#6b6b6b',
  background:'#fff',
  linea:'#d4d4d4',
  boxShadow:'2px 2px 10px rgba(105, 100, 100, 0.3)',
  colorPuntos:'#b8b6b6',
  userName: '#000',
  userName2: '#000',
  comments:'#f0f2f5',
  commentsHover:'#e2e6eb',
  numbers:'#858585',
  globo: '',
  commentPost: '1px solid #a2a2a2',
  botonCircularHover:'#e2e6eb',
  botonCircular: '#f0f2f5',
  iconsCircular:'',
  iconCircularNormal:'',
  linkColor:'#1492e6',
  linkHover:'#ff0096',
  bH:'#2a81bb',
  eye:'',
  hover:'opacity(.6)',
  status:'light',
  selected: '#fff',
  rosaHover: '#ff009521'

};
const App = () => {
  const[theme, setTheme] = useState("light");
  const isDarkTheme = theme === 'dark';
  const toggleTheme = () =>{
    setTheme(isDarkTheme ? "light" : "dark");
  }
  const { active: sessionActive } = useSelector(state => state.sessionActive);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <StyledApp>
      <div style={{backgroundColor:theme.background, minHeight:'100vh'}}>
      <BrowserRouter>
        {
          sessionActive ? <HomeHeader /> : <MainHeader />
        }   
        <div>
          <div style={{position:'absolute', top:'20px', left:'1300px'}}>
          <SunIcon />
          <Switch toogleTheme={toggleTheme} isDark={isDarkTheme}/>
          <MoonIcon />
          </div>
        
        
              <div id='content'>
                  <AppRouter />
              </div>
        </div>
          
        
        
      </BrowserRouter>
    </div>
      </StyledApp>
    </ThemeProvider>
  )
}

export default App;