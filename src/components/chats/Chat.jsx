import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { user } from "../../images";

const Chat = () => {
  const [chatByUser, setChatByUser] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
  const [formValue, setFormValue] = useState("");

  const dummy = useRef();

  return (
    <div>
      <div className="header-chat">
        <div className="name-user-header">Henry Cavil</div>
      </div>
      <br />
      <br />
      <div className="linea-acostada" />
      <div className="section-message">
        <div className="sidebar-messages main-message">
          <div className="scrollbox">
            <div className="scrollbox-inner">
              {chatByUser.map((chat, index) => {
                return (
                  <div className="row" key={`${index}-${chat}-n`}>
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
                );
              })}
              <span></span>
            </div>
          </div>
        </div>

        <form className="form-chat">
          <input
            className="input-message"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
          />

          <button
            className="form-button-message send-button-message"
            type="submit"
            disabled={!formValue}
          >
            🕊️
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
