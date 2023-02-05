import React from "react";
import CommentPortal from "../portals/CommentPortal";

const CommentModal = (props) => {
  const { children, toggle, active, dispatch } = props;

  const styles = {
    wrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      backgroundColor: "rgba(0,0,0,0.7)",
      minWidth: "100vw",
      overflow: "hidden",
    },

    window: {
      position: "relative",
      background: "#fff",
      borderRadius: 10,
      paddingBottom: 15,
      boxShadow: "2px 2px 10px  rgba(0,0,0,0.3)",
      zIndex: 10,
      top: 40,
      minWidth: "80vw",
      height: "90vh",
    },

    closeBtn: {
      position: "absolute",
      top: 10,
      right: 10,
      background: "none",
      border: "none",
    },
  };

  return (
    <CommentPortal>
      {active && (
        <div style={styles.wrapper}>
          <div style={styles.window}>
            <button style={styles.closeBtn} onClick={() => toggle(dispatch, active)}>X</button>
            <div>{children}</div>
          </div>
        </div>
      )}
    </CommentPortal>
  );
};

export default CommentModal;
