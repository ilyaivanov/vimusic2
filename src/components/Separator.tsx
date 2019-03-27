import React from "react";

export const marginStep = 20;

export default ({level = 0}: { level?: number }) =>
  <div style={{
    height: 1,
    width: "100%",
    backgroundColor: "#d6d6d6",
    marginLeft: 15 + level * marginStep,
    marginTop: 10,
    marginBottom: 10
  }}/>;
