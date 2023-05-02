import React, { useState } from "react";
import "./switch.css";

function Switch({toogleTheme, isDarkTheme,}) {
  const [isToggled, setIsToggled] = useState(isDarkTheme);

  const onToggle = () => {
    setIsToggled(!isToggled);
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