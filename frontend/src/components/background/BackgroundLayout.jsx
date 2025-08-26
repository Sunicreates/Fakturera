
import React from "react";
import LanguageButton from "./LanguageButton";

const BackgroundLayout = ({ children }) => {
  return (
    <div className="background-layout" style={{ position: "relative" }}>
      <LanguageButton />
      {children}
    </div>
  );
};

export default BackgroundLayout;


