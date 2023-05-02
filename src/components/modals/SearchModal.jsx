import React from 'react';
import SearchPortal from '../portals/SearchPortal';

export const SearchModal = (props) => {
    const { children, toggle, active, dispatch } = props;

    const styles = {
        wrapper: {
            position: "fixed",
            top: 70,
            width: "100%",
            height: "100%",
        },
        window: {
            position: "relative",
            background: "pink",
            borderRadius: 10,
            right: 685,
            float: "right",
            width: "50%",
            maxHeight: "48%",
            minHeight: "0%",
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
        <SearchPortal>
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
        </SearchPortal>
    )
};
