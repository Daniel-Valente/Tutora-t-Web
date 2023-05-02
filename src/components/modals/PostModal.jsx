import React from "react";
import PostPortal from "../portals/PostPortal";
import { useTheme } from "styled-components";

const PostModal = (props) => {
  const { children } = props;
  const theme = useTheme();

  const styles = {
    wrapper: {
      top: 0,
      left: 0,
      width: "100%",
      hight: "100%",
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
    },
    window: {
      position: "relative",
      background: "#fff",
      borderRadius: 10,
      paddingTop: 15,
      marginTop: 45,
      boxShadow: "2px 2px 10px  rgba(0,0,0,0.3)",
      top: 0,
      width: "50vw",
      backgroundColor: theme.header
    },
  };

  return (
    <>
      {
        <div style={styles.wrapper}>
          <div style={styles.window}>
            <div> {children} </div>
          </div>
        </div>
      }
    </>
  );
};

export default PostModal;
