
import React from "react";
import LanguageButton from "./LanguageButton";

const BackgroundLayout = ({ children }) => {
  return (
    <div className="background-layout">
      <div className="background-container" aria-hidden="true" />
      <LanguageButton />
      {children}
    </div>
  );
};

export default BackgroundLayout;


