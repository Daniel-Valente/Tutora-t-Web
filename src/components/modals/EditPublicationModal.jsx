import React from "react";
import { Link } from "react-router-dom";
import PublicationPortal from "../portals/PublicationPortal";

const EditPublicationModal = (props) => {
    const { children, toggle, active, dispatch, prevPath } = props;

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
            minWidth: "100%",
        },
        window: {
            position: "relative",
            background: "#fff",
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
        toggle(dispatch, active);
    };

    return (
        <PublicationPortal>
            {active && (
                <div style={styles.wrapper}>
                    <div style={styles.window}>
                        <button style={styles.closeBtn}>
                            <Link to={prevPath} style={{ textDecoration: 'none' }} onClick={handleClose}>X</Link>
                        </button>
                        <div> {children} </div>
                    </div>
                    <div
                        onClick={ toggle(dispatch, active)}
                        style={styles.background}
                    />
                </div>
            )}
        </PublicationPortal>
    );
};

export default EditPublicationModal;
