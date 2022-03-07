import React from "react";

import yen from "../Navigation/images/yen-logo.png";

function Landing() {
  return (
    <>
      <h1>Welcome to</h1>
      <img src={yen} alt="yen" style={{ display: "block", margin: "0 auto" }} />
    </>
  );
}

export default Landing;
