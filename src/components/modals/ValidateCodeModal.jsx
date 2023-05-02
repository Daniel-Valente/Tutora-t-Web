
import { useTheme } from "styled-components";
import LogInPortal from "../portals/LogInPortal";

const ValidateCodeModal = (props) => {
  const { children, toggle, active, dispatch } = props;
  const theme = useTheme();

  const styles = {
    wrapper: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      backgroundColor: "rgba(0,0,0,0.7)",
      minWidth: "100vw",
    },
    window: {
      position: "relative",
      background: theme.header,
      borderRadius: 10,
      padding: 15,
      boxShadow: "2px 2px 10px  rgba(0,0,0,0.3)",
      zIndex: 10,
      top: 270,
      minWidth: 400,
      height: "30vh",
    },
    closeBtn: {
      position: "absolute",
      top: 10,
      right: 10,
      color: theme.userName,
      background: "none",
      border: "none",
    },
  };

  return (
    <LogInPortal>
      {active && (
        <div style={ styles.wrapper }>
          <div style={ styles.window } >
            <button style={ styles.closeBtn } onClick={() => toggle(dispatch, active)}>X</button>
            <div>{children}</div>
          </div>
        </div>
      )}
    </LogInPortal>
  );
};

export default ValidateCodeModal;
