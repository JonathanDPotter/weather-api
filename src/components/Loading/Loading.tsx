import React from "react";
// images
import { ReactComponent as ImpLogo } from "../../images/pinkImpLogo.svg";
// styles
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <h3>Loading</h3>
      <ImpLogo />
    </div>
  );
};

export default Loading;
