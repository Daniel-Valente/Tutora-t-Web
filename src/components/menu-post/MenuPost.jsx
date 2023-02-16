import React from 'react';
import { useSelector } from 'react-redux';

const MenuPost = ({ x, y, showMenu, userPost }) => {
    const userInfoPerfil = useSelector(state => state.user);

    const style = () => {
        return {
            width: 150,
            borderRadius: 10,
            background: "#fff",
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            top: y,
            left: x,
            boxShadow: "2px 2px 10px  rgba(0,0,0,0.3)",
            position: 'absolute',
            display: showMenu ? "flex" : 'none',   
        };
    };

  return (
    <div style={style()}>
        { userInfoPerfil.uid_user === userPost.uid_user && <button style={ styles.div } >Editar</button> }
        <button style={ styles.div } >Ocultar</button>
        <button style={ styles.div } >Guardar</button>
        { userInfoPerfil.uid_user === userPost.uid_user && <button style={ styles.div } >Eliminar</button> }
    </div>
  );
};

const styles = {
    div: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        height: '1000',
    },
    margin: {
        margin: '10px, 0',
    }
}

export default MenuPost;