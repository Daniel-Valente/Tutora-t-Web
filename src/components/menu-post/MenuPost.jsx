import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useBodyScrollLock } from '../../hooks';

const MenuPost = ({ x, y, showMenu, userPost, handleDelete, handleHide, handleSave, post, hide, save, prevUrl }) => {
    const userInfoPerfil = useSelector(state => state.user);
    const location = useLocation();
    const [, toggle] = useBodyScrollLock();

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
            {userInfoPerfil.uid_user === userPost.uid_user && 
            <Link to={`${prevUrl}/edit/${post._id}`} 
                style={{ textDecoration: 'none' }}
                state={{ background: location, editPublicationModal: true, post: post, prevPath: location.pathname }}>
                <button style={ styles.div }>Editar</button>
            </Link>
            }
            <button style={styles.div} onClick={ handleHide } >{ !hide ? 'Ocultar' : 'Mostrar'  }</button>
            <button style={styles.div} onClick={ handleSave } >{ !save ? 'Guardar' : 'Quitar'  }</button>
            {userInfoPerfil.uid_user === userPost.uid_user && <button style={styles.div} onClick={handleDelete}>Eliminar</button>}
        </div>
    );
};

const styles = {
    div: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        height: '1000',
        border: '0',
        backgroundColor: '#fff',
        margin: '0.5vh'
    },
    margin: {
        margin: '10px, 0',
    }
}

export default MenuPost;