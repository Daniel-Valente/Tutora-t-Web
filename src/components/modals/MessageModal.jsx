import React from "react";
import MessagePortal from "../portals/MessagePortal";
import { useTheme } from "styled-components";

const MessageModal = (props) => {
  const { children, toggle, active, dispatch } = props;
  const theme = useTheme();

  const styles = {
    wrapper: {
      position: "absolute",
      top: 70,
      right: 0,
      width: "100vw",
      height: "92%",
    },

    window: {
      position: "relative",
      background: theme.header,
      float: "right",
      borderRadius: 10,
      width: "20vw",
      boxShadow: "2px 2px 10px  rgba(0,0,0,0.3)",
      zIndex: 10,
      top: 0,
      marginRight: "1vw",
    },

    background: {
      position: "absolute",
      width: "100vw",
      height: "100%",
      top: 0,
      left: 0,
    },
  };

  return (
    <MessagePortal>
      {active && (
        <div style={styles.wrapper}>
          <div style={styles.window}>
            <div> {children} </div>
          </div>
          <div
            onClick={() => toggle(dispatch, active)}
            style={styles.background}
          />
        </div>
      )}
    </MessagePortal>
  );
};

export default MessageModal;
