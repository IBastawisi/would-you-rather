import React from "react";
import { useLocation } from "react-router";
import notFound from "../404.svg";

const NotFound: React.FC = () => {
  let location = useLocation();

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <img src={notFound} width={256} alt="Resource Not Found" />
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  );
}

export default NotFound