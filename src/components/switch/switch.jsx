import React, { useState } from "react";
import "./switch.css";
import { store } from "../../store";

function Switch({toogleTheme}) {
  const { layout: { isDarkTheme } } = store.getState();
  const [isToggled, setIsToggled] = useState(isDarkTheme);

  const onToggle = () => {
    setIsToggled(!isDarkTheme);
    toogleTheme();
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}
export default Switch;  