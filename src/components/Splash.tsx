import React from "react";
import logo from "../logo.svg";

const Splash: React.FC = () => {

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <img src={logo} width={256} alt="Resource Not Found" />
      <h3>Would You Rather</h3>
    </div>
  );
}

export default Splash