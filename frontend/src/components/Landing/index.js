import React from "react";

import yen from "../Navigation/images/yen-logo.png";

function Landing() {
  return (
    <>
      <h1 style={{ fontFamily: "serif" }}>
        Welcome to
        <img
          src={yen}
          alt="yen"
          style={{ display: "block", margin: "0 auto" }}
        />
      </h1>
    </>
  );
}

export default Landing;
