import React from "react";
import PublicationPortal from "../portals/PublicationPortal";
import { useTheme } from "styled-components";

const PublicationModal = (props) => {
  const { children, toggle, active, dispatch, toggleLock } = props;
  const theme = useTheme();

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
      minWidth: "100%",
    },
    window: {
      position: "relative",
      background: theme.header,
      borderRadius: 10,
      padding: 15,
      boxShadow: "2px 2px 10px  rgba(0,0,0,0.3)",
      zIndex: 10,
      top: "15vh",
      minWidth: 700,
      height: "70vh",
    },
    closeBtn: {
      position: "absolute",
      top: 10,
      right: 10,
      color: theme.userName,
      background: "none",
      border: "none",
    },
    background: {
      position: "absolute",
      width: "100vw",
      height: "100%",
      top: 0,
      left: 0,
    },
  };

  const handleClose = () => {
    toggleLock();
    toggle(dispatch, active);
  }
  
  return (
    <PublicationPortal>
      {active && (
        <div style={styles.wrapper}>
          <div style={styles.window}>
          <button style={styles.closeBtn} onClick={handleClose}>X</button>
            <div> {children} </div>
          </div>
          <div
            onClick={handleClose}
            style={styles.background}
          />
        </div>
      )}
    </PublicationPortal>
  );
};

export default PublicationModal;
