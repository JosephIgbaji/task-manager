import React from "react";
import Button from "../Button/Button";

// const handleAdd = () => {
//   console.log("clicked");
// };

const Header = ({ title, onToggle, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        text={showAdd ? "Close" : "Add"}
        color={showAdd ? "red" : "green"}
        onClick={onToggle}
      />
    </header>
  );
};

export default Header;
