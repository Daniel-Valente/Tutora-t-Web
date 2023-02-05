import React from 'react';
import { Link } from 'react-router-dom';
import { search, user } from '../../images';

const ChatsList = () => {
    const [chats, setChats] = useState([1,2,3,4,5,65,7,8,90,0,7,6,5,4,3,2,11,,1,2,34,5,6,1]);
    
    return (
        <div>
            <div className="search-message">
                <input
                    className="search-input"
                    placeholder="Buscar mensaje o usuario"
                    type="text"
                ></input>
                <button className="search-icon">
                    <img className="search-imag" src={search} alt="search" />
                </button>
            </div>
            <br />
            <br />
            <div className="linea-acostada" />
            <div className="sidebar-chat-list">
                <div className="scrollbox">
                    <div className="scrollbox-inner">
                        {
                            chats.map((chat, index) => {
                                return (
                                    <div className="row" key={`${index}-${chat}-n`}>
                                        <div className="col-3">
                                            <Link to="">
                                                <div className="boton-circular-volteado-5">
                                                    <img
                                                        className="icon-user-message"
                                                        src={user}
                                                        alt="user-image"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-9">
                                            <p style={{ marginLeft: "10%", marginTop: "25px" }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    <b>Henry Cavil</b>
                                                </label>
                                                <br />
                                                este es un borrador
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatsList;