import React from 'react';

const MenuCourse = ({ x, y, showMenu, handleDelete }) => {
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
        <button className='Eliminar' style={ styles.div } onClick={handleDelete}>Eliminar</button>
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
        border: '0',
        backgroundColor: '#fff',
        margin: '0.5vh'
    },
    margin: {
        margin: '10px, 0',
    }
}

export default MenuCourse;