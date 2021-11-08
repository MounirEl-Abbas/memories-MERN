import React from "react";
import headerIcon from "../assets/images/memory-icon.svg";

const Header = () => {
  return (
    <header>
      <h1>Memories</h1>
      <img
        src={headerIcon}
        alt="Illustration of a boy playing with his toy car"
      />
    </header>
  );
};

export default Header;
