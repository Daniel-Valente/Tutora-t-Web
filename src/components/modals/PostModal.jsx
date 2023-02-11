import React from "react";
import PostPortal from "../portals/PostPortal";

const PostModal = (props) => {
  const { children } = props;

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
    },
  };

  return (
    <PostPortal>
      {
        <div style={styles.wrapper}>
          <div style={styles.window}>
            <div> {children} </div>
          </div>
        </div>
      }
    </PostPortal>
  );
};

export default PostModal;
