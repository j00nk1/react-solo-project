import React from "react";

import yen from "../Navigation/images/yen-logo.png";

function Landing() {
  return (
    <>
      <h1
        style={{
          margin: "0 auto",
          paddingTop: "20px",
          fontFamily: "serif",
        }}
      >
        Welcome to
        <img
          src={yen}
          alt="yen"
          style={{ display: "block", margin: "0 auto", width: "50vw" }}
        />
      </h1>
    </>
  );
}

export default Landing;
